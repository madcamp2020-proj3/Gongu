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
        <div id="title3" className="bg-current">
            <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css"></link>
            <Button variant="secondary" size="lg" block onClick={handleExit}>방 나가기</Button>
            <Button variant="danger" size="lg" block onClick={handleDelete}>방 삭제하기</Button>
        </div>
    );
}
