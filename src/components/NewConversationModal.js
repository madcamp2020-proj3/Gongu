import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';


export default function NewconversationModal({ closeModal, myId, handleExit, handleDelete }) {
    const { createConversation } = useConversations();
    const path = window.location.pathname;

    function handleSubmit(e) {
        e.preventDefault();
        console.log("눌렀습니다.")
        fetch('http://192.249.18.236:3001' + path)
            .then(res => res.json())
            .then(result => {
                const idx = result.recipients.indexOf(myId);
                result.recipients.splice(idx, 1);
                createConversation(result.recipients);
            });
        closeModal();
    }

    return (
        <div className="bg-current">
            <Button variant="secondary" size="lg" block onClick={handleExit}>Exit</Button>
            <Button variant="danger" size="lg" block onClick={handleDelete}>Delete</Button>
        </div>
    );
}
