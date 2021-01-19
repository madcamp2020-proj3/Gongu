import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
    const path = window.location.pathname;
    const parseData = path.split('/')[path.split('/').length - 1];
    const [conversations, setConversations] = useLocalStorage('conversations' + path, []);
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

    useEffect(() => {
        fetch('http://192.249.18.236:3001' + path)
            .then(res => res.json())
            .then(result => {
                const idx = result.recipients.indexOf(id);
                result.recipients.splice(idx, 1);
                backupHistory(parseData, result.recipients);
            });
    }, []);

    const addMessageToConversation = useCallback(({ text, sender }) => {
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

    const formattedConversations = (words) => {
        return words.map(conversation => {
            console.log("채팅 보맷팅 전: ", conversations);
            console.log("채팅 포맷팅");
            const recipients = conversation.recipients.map(recipient => {
                return { id: recipient };
            });

            const messages = conversation.messages.map(m => {
                const fromMe = id === m.sender;
                return { ...m, fromMe };
            });
            return { ...conversation, messages, recipients };
        });
    }

    const value = {
        conversations: formattedConversations(conversations),
        sendMessage,
        createConversation,
        backupHistory,
        setConversations
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}