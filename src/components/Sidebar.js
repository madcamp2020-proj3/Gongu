import React, { useState, useEffect } from 'react';
import { Tab, Nav, Button, Modal, Form } from 'react-bootstrap';
import Conversation from './Conversation';
import Contract from './Contact';
import NewConversationModal from './NewConversationModal'
import NewContractModal from './NewContactModal'
import { useHistory } from 'react-router-dom';
import { useConversations } from '../contexts/ConversationsProvider';


const CONVERSATION_KEY = "conversation";
const CONTRACT_KEY = "contracts";

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const conversationOpen = activeKey === CONVERSATION_KEY;
    const path = window.location.pathname;
    const history = useHistory();
    const { createConversation } = useConversations()

    useEffect(() => {
        fetch('http://192.249.18.236:3001' + path)
            .then(res => res.json())
            .then(result => {
                const idx = result.recipients.indexOf(id);
                result.recipients.splice(idx, 1);
                createConversation(result.recipients);
            });
    }, []);

    function closeModal() {
        setModalOpen(false);
    }

    function handleExit() {
        fetch("http://192.249.18.236:3001/exit" + path + '/' + id)
            .then()
            .then();
        history.goBack();
    }

    function handleDelete() {
        fetch("http://192.249.18.236:3001/delete" + path + '/' + id)
            .then(res => res.json())
            .then(result => {
                if (result.token) {
                    console.log("삭제되었습니다.");
                    history.goBack();
                } else {
                    console.log("삭제 권한이 없습니다.");
                }
            });
    }


    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Form>
                <Button onClick={() => handleDelete()} variant="danger" className="rounded-0 w-1/2">
                    Exit
                            </Button>
                <Button onClick={() => handleExit()} variant="secondary" className="rounded-0 w-1/2">
                    Delete
                    </Button>
            </Form>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className='text-center'>
                    <Nav.Item className='w-1/2'>
                        <Nav.Link eventKey={CONVERSATION_KEY}>Conversation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='w-1/2'>
                        <Nav.Link eventKey={CONTRACT_KEY}>Information</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1 bg-white">
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        <Conversation />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTRACT_KEY}>
                        <Contract />
                    </Tab.Pane>
                </Tab.Content>
                {/* {
                    conversationOpen
                        ? <></>
                        :
                } */}
                <div className="p-2 border-top border-right small bg-white">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => setModalOpen(true)} className="rounded-0">
                    New {conversationOpen ? "Conversation" : "Contact"}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationOpen ?
                    <NewConversationModal closeModal={closeModal} myId={id} /> :
                    <NewContractModal closeModal={closeModal} />
                }
            </Modal>
        </div>
    )
}
