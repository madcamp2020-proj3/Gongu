import { FormCheck } from "react-bootstrap";
import React from 'react'
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Dashboard({ id }) {
    const { selectedConversation } = useConversations();
    console.log("간 장소가...", selectedConversation);

    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <Sidebar id={id} />
            {selectedConversation && <OpenConversation myId={id} />}
        </div>
    )
}
