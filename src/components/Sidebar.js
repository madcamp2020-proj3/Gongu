import React, { useState } from 'react';
import { Tab, Nav, Table } from 'react-bootstrap';
import Conversation from './Conversation';
import Contract from './Contact';

const CONVERSATION_KEY = "conversation";
const CONTRACT_KEY = "contracts";

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);

    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Tab.Content>
                        <Tab.Pane eventKey={CONVERSATION_KEY}>
                            <Conversation />
                        </Tab.Pane>
                        <Tab.Pane eventKey={CONTRACT_KEY}>
                            <Contract />
                        </Tab.Pane>
                    </Tab.Content>
                </Nav>
            </Tab.Container>
        </div>
    )
}
