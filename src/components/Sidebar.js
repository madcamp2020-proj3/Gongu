import React, { useState, useEffect } from 'react';
import { Tab, Nav, Button, Modal, Form } from 'react-bootstrap';
import Conversation from './Conversation';
import Memo from './Memo';
import NewConversationModal from './NewConversationModal'
import NewMemoModal from './NewMemoModal'
import { useHistory } from 'react-router-dom';
import { useConversations } from '../contexts/ConversationsProvider';
import './scroll.css'
// import SideNav from './sidenav'


const CONVERSATION_KEY = "conversation";
const CONTRACT_KEY = "contracts";

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(CONTRACT_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const conversationOpen = activeKey === CONTRACT_KEY;
    const path = window.location.pathname;
    const parseData = path.split('/')[path.split('/').length - 1];
    const history = useHistory();
    const { createConversation, backupHistory } = useConversations()
    const [roominfo, setRoominfo] = useState([]);
    const [sideMenu, setSideMenu] = useState(null);

    const showSideMenu = () => {
        setSideMenu(!sideMenu);
        document.body.style.overflow = "hidden";
    };

    const hideSideMenu = (props) => {
        setSideMenu(false);
        document.body.style.overflow  = "unset";
    }



    useEffect(() => {
        fetch('http://192.249.18.236:3001' + path)
            .then(res => res.json())
            .then(result => {
                const idx = result.recipients.indexOf(id);
                result.recipients.splice(idx, 1);
                backupHistory(parseData, result.recipients);
                setRoominfo(result);
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
                    fetch("http://192.249.18.236:3001/history" + '/' + parseData)
                        .then(res => res.json())
                        .then(result => {
                            if (result.token) {
                                console.log("삭제되었습니다.");
                                history.goBack();
                            } else {
                                console.log("삭제 권한이 없습니다.");
                            }
                        });
                    history.goBack();
                } else {
                    console.log("삭제 권한이 없습니다.");
                }
            });
    }

    return (
        <>
        
        <div  className="d-flex flex-column w-2/5 sm:w-1/5">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className='text-center'>
                    <Nav.Item className='w-1/2'>
                        <Nav.Link eventKey={CONTRACT_KEY}>방 정보</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='w-1/2'>
                        <Nav.Link eventKey={CONVERSATION_KEY}>참여자</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1 bg-white">
                    <Tab.Pane eventKey={CONTRACT_KEY}>
                        <Memo  room={roominfo} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        <Conversation />
                    </Tab.Pane>
                </Tab.Content>
                {/* {
                    conversationOpen
                        ? <></>
                        :
                } */}
                <div className="p-2 border-top border-right bg-white text-lg">
                    내 정보: <span className="text-muted">{id}</span>
                </div>
                {
                    !conversationOpen ? <Button onClick={() => setModalOpen(true)} className="rounded-0">
                        설정
                </Button> : null
                }

            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationOpen ?
                    <NewMemoModal closeModal={closeModal} /> :
                    <NewConversationModal closeModal={closeModal} myId={id} handleExit={handleExit} handleDelete={handleDelete} />
                }
            </Modal>
        </div>
        </>
    )
}
