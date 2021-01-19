import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Conversation() {
    const { conversations } = useConversations();
    console.log("conversation.js ", conversations);
    return (
        <ListGroup variant="flush">
            { conversations.length != 0
                ? (
                    conversations[0].recipients.map(e => (
                        <ListGroup.Item>
                            {e.id}
                        </ListGroup.Item>
                    ))
                )
                : <></>}
        </ListGroup>
    );
}
