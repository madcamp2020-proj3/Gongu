import React, { useState, useEffect } from 'react';
import { Container, Button, } from 'react-floating-action-button';
import JobBoardComponent from './JobBoardComponent';
import { FaPlus } from 'react-icons/fa';
import Modal2 from './CreateChatModal';
import { Row, Col, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Mypage from './Mypage';
import moment from 'moment';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Domain({ setLogin, userId }) {
    const [mypageOpen, setMypageOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [room, setRoom] = useState([]);
    const [id, setId] = useState([]);
    const [owner, setOwner] = useState([]);
    const { backupHistory } = useConversations();

    const closempModal = () => {
        setMypageOpen(false);
    }

    const checkUser = (element) => element === userId;

    function checkid(arr) {
        if (Array.isArray(arr)) {
            if (arr.findIndex(checkUser) === -1) return false;
            else return true;
        }
        else return false;
    }

    function selectroom(item) {
        if (checkid(item.recipients)) return true;
        else return false;
    }

    function handlemypage(e) {
        e.preventDefault();
        e.stopPropagation();

        fetch('http://192.249.18.236:3001/mypage')
            .then(res => res.json())
            .then(res => {
                var validRoom = res.filter(selectroom);
                setRoom(validRoom.map((el) => el['title']));
                setId(validRoom.map((el) => el.id));
                setOwner(validRoom.map(el => el.owner));
            })
            .then(setMypageOpen(true));
    }

    const history = useHistory();

    const modalClose = () => {
        fetch("http://192.249.18.236:3001/makeroom")
            .then(res => res.json())
            .then(result => setJobs(result));
        setModalOpen(false);
    }

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    function handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() =>
        fetch("http://192.249.18.236:3001/makeroom")
            .then(res => res.json())
            .then(result => setJobs(result))
        , []);

    const filterFunc = ({ category }) => {
        if (filters.length === 0) {
            return true;
        }

        const tags = [];

        if (category) {
            tags.push(...category);
        }
        return filters.every(filter => tags.includes(filter));
    }

    const handletagClick = (tag) => {
        if (filters.includes(tag)) return;
        setFilters([...filters, tag]);
    }

    const handleFilterClick = (passedFilter) => {
        setFilters(filters.filter(f => f !== passedFilter));
    }

    const clearFilters = () => {
        setFilters([]);
    }

    const filteredJobs = jobs.filter(filterFunc);
    const filteredJobs2 = filteredJobs.reverse();

    function handleLogout(e) {
        e.preventDefault();
        setLogin(false);
    }

    function goToRoom(roomId) {
        fetch("http://192.249.18.236:3001/entrance", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "roomId": roomId,
                "userId": userId
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.recipients != undefined) {
                    console.log("이동");
                    history.push('/chatroom/' + roomId);
                }
            })
    }

    function checkNew(date) {
        var now = moment().utcOffset('+09:00').format('YYYY-MM-DD');
        return (date == now);
    }

    return (
        <>
            <header className="mb-8 p-16 bg-white">
                <Row>
                    <div className="text-6xl ml-16 font-sans font-bold" style={{ color: "#0080ff" }}>하마</div>
                    <div className="text-6xl text-white font-bold font-sans" style={{ backgroundColor: "#0080ff" }}>하마</div>

                    <Col>
                        <div className="flex flex-col flex-wrap items-end ml-auto push group">
                            <h1 className="text-lg ">
                                {userId} 님 안녕하세요
                            </h1>

                            <h0>
                                <button onClick={handleLogout} className="text-lg text-white float-right font-bold py-2 px-3 border border-solid border-indigo-500 rounded w-28" style={{ backgroundColor: "#0080ff" }}>Logout</button>
                                <button onClick={handlemypage} className="text-lg text-white font-bold py-2 px-3 border border-solid border-indigo-500 rounded float-right mr-2 w-28" style={{ backgroundColor: "#0080ff" }}>Mypage</button>
                                <Modal show={mypageOpen} onHide={closempModal}>
                                    <Mypage close={closempModal} roominfo={room} userid={userId} idinfo={id} ownerinfo={owner} />
                                </Modal>

                            </h0>
                        </div>
                    </Col>
                </Row>


            </header>

            <div className="container">
                {filters.length > 0 && (
                    <div className={`flex bg-white shdow-md -my-16 mb-20 mx-10 p-6 rounded z-1 relative border border-indigo-200 items-center`}>
                        {filters.map((filter) => (
                            <span className="cursor-pointer mr-4 mb-2 mt-2 rounded font-bold text-indigo-500 bg-indigo-100 p-2 sm:mb-0"
                                onClick={() => handleFilterClick(filter)}>
                                <span
                                    className=''>x {filter}
                                </span>
                            </span>
                        ))}
                        <button onClick={clearFilters} className="font-bold text-gray-700 ml-auto ">Clear</button>
                    </div>
                )}

                {
                    jobs.length === 0 ? (
                        <p>Jobs are fetching...</p>
                    ) : (

                            filteredJobs2.map(job => (
                                <JobBoardComponent
                                    job={job}
                                    key={job.id}
                                    handletagClick={handletagClick}
                                    goToRoom={goToRoom}
                                    isNew={checkNew(job.startDate)} />
                            ))
                        )
                }

                <div>

                    <Container>
                        <button onClick={() => handleClick, openModal} style={{ backgroundColor: "#0080ff" }} className="text-white rounded-full p-6 text-lg shadow-lg"> <FaPlus /></button>
                        <Modal2 open={modalOpen} close={closeModal} func={modalClose} header="새로운 채팅방 만들기" myId={userId}>
                        </Modal2>

                    </Container>
                </div>
            </div>
        </>
    );
}
