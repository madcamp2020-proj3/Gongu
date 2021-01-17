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
            if (prevConversations.length == 0) {
                return [{ recipients, messages: [] }];
            } else {
                return [{ recipients, messages: prevConversations[0].messages }];
            }
        })
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
        socket.emit('send-message', { recipients, text });
        addMessageToConversation({ recipients, text, sender: id })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient;
            });
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        });

        const messages = conversation.messages.map(m => {
            const contact = contacts.find(contact => {
                return contact.id === m.sender;
            });
            const name = (contact && contact.name) || m.sender;
            const fromMe = id === m.sender;
            return { ...m, senderName: name, fromMe };
        });

        const selected = index === selectedConversationIndex;
        return { ...conversation, messages, recipients, selected };
    });

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false;
    a.sort();
    b.sort();
    return a.every((element, index) => {
        return element === b[index];
    });
}