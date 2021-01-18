import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
    const path = window.location.pathname;
    const [conversations, setConversations] = useLocalStorage('conversations' + path, []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();
    const socket = useSocket();

    function createConversation(recipients) {
        setConversations(prevConversations => {
            console.log("여긴가...", prevConversations)
            if (prevConversations.length == 0) {
                return [{ recipients, messages: [] }];
            } else {
                return [{ recipients, messages: prevConversations[0].messages }];
            }
        })
    }

    async function backupHistory(roomId, recipients) {
        console.log("백업 요청 : " + roomId);
        return fetch("http://192.249.18.236:3001/backup/" + roomId)
            .then(res => res.json())
            .then(result => {
                return setConversations(prevConversations => {
                    if (prevConversations.length != 0) {
                        console.log(recipients, result);
                        return [{ recipients, messages: result }];
                    } else {
                        console.log(recipients, result);
                        return [{ recipients, messages: [] }];
                    }
                });
            });
    }

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        setConversations(prevConversations => {
            const newMessage = { sender, text };
            const newConversations = prevConversations.map
                (conversation => {
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                });
            return newConversations;
        });
    }, [setConversations]);

    useEffect(() => {
        if (socket == null) return;
        socket.on('receive-message', addMessageToConversation);
        return () => socket.off('receive-message');
    }, [socket, addMessageToConversation]);

    function sendMessage(recipients, text) {
        const parseData = path.split('/')[path.split('/').length - 1]
        socket.emit('send-message', { recipients, text, parseData });
        addMessageToConversation({ recipients, text, sender: id });
    }

    const formattedConversations = conversations.map((conversation, index) => {
        console.log("채팅 보맷팅 전: ", conversations);
        console.log("채팅 포맷팅");
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient;
            });
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        });

        const messages = conversation.messages.map(m => {
            const fromMe = id === m.sender;
            return { ...m, fromMe };
        });

        const selected = index === selectedConversationIndex;
        return { ...conversation, messages, recipients, selected };
    });

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        backupHistory
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}