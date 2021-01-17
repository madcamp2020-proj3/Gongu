import React, { useState, useEffect } from 'react';
import { Container, Button, lightColors, darkColors } from 'react-floating-action-button';
import JobBoardComponent from './JobBoardComponent';
import { FaPlus } from 'react-icons/fa';
import data from '../assets/data.json';
import Modal from './CreateChatModal';
import { Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Domain({ setLogin, userId }) {
    const [modalOpen, setModalOpen] = useState(false);
    // const { createContact } = useContacts();
    const history = useHistory();

    const modalClose = () => {
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

        // return tags.some(tag => filters.includes(tag));
        return filters.every(filter => tags.includes(filter));
    }

    const handletagClick = (tag) => {
        // avoid re-adding tag
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

    function handleClick(e) {
        e.preventDefault();
        setLogin(false);
    }

    function goToRoom(roomId) {
        console.log(userId);
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
                console.log(result.recipients);
                // createContact(result.recipients);
                history.push('/chatroom/' + roomId);
            });
    }

    return (
        <>
            <header className="mb-8 p-16 bg-white">
                <Row>
                    <div className="text-6xl ml-16 font-sans font-bold" style={{ color: "#0080ff" }}>Sy</div>
                    <div className="text-6xl text-white font-bold font-sans" style={{ backgroundColor: "#0080ff" }}>no</div>

                    <Col>
                        <div className="flex flex-col flex-wrap items-end ml-auto push">
                            <h1 className="text-lg ">
                                {}님 안녕하세요
                            </h1>

                            <h0>
                                <button onClick={handleClick} className="text-lg text-white float-right font-bold py-2 px-3 border border-solid border-indigo-500 rounded w-28" style={{ backgroundColor: "#0080ff" }}>Logout</button>
                                <button onClick={handleClick} className="text-lg text-white font-bold py-2 px-3 border border-solid border-indigo-500 rounded float-right mr-2 w-28" style={{ backgroundColor: "#0080ff" }}>Mypage</button>
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
                            filteredJobs.map(job => (
                                <JobBoardComponent
                                    job={job}
                                    key={job.id}
                                    handletagClick={handletagClick}
                                    goToRoom={goToRoom} />
                            ))
                        )
                }

                <div>

                    <Container>
                        <button onClick={() => handleClick, openModal} style={{ backgroundColor: "#0080ff" }} className="text-white rounded-full p-6 text-lg shadow-lg"> <FaPlus /></button>
                        <Modal open={modalOpen} close={closeModal} func={modalClose} header="새로운 채팅방 만들기" >
                        </Modal>

                    </Container>
                </div>
            </div>
        </>
    );
}
