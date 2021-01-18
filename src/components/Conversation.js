import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Conversation() {
    const { conversations, selectConversationIndex } = useConversations();
    console.log(conversations.length != 0);
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
