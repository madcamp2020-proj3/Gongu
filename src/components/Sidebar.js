import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Conversation from './Conversation';
import Contract from './Contact';
import NewConversationModal from './NewConversationModal'
import NewContractModal from './NewContractModal'


const CONVERSATION_KEY = "conversation";
const CONTRACT_KEY = "contracts";

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const conversationOpen = activeKey === CONVERSATION_KEY;

    function closeModal() {
        setModalOpen(false);
    }


    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY}>Conversation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTRACT_KEY}>Contract</Nav.Link>
                    </Nav.Item>
                </Nav>
                    <Tab.Content className="border-right overflow-auto flex-grow-1">

                        <Tab.Pane eventKey={CONVERSATION_KEY}>
                            <Conversation />
                        </Tab.Pane>
                        <Tab.Pane eventKey={CONTRACT_KEY}>
                            <Contract />
                        </Tab.Pane>
                    </Tab.Content>
            <div className="p-2 border-top border-right small">
                Your Id: <span className="text-muted">{id}</span>
            </div>
            <Button onClick={() => setModalOpen(true)} className="rounded-0">
                New {conversationOpen ? "Conversation" : "Contact"}
            </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationOpen ?
                    <NewConversationModal closeModal={closeModal}/> :
                    <NewContractModal closeModal={closeModal}/>
                }    
            </Modal>
        </div>
    )
}
