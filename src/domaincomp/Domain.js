import React, { useState, useEffect } from 'react';
import { Container, Button, lightColors, darkColors } from 'react-floating-action-button';
import JobBoardComponent from './JobBoardComponent';
import { FaPlus } from 'react-icons/fa';
import data from '../assets/data.json';
import Modal from './CreateChatModal';

export default function Domain() {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => setJobs(data), []);

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

    return (
        <>
            <header className="mb-8 p-20 bg-white">
                <div className="text-6xl ml-16 text-blue-500 font-bold" style={{ color: "#0080ff" }}>Syno</div>
                <button className="text-lg text-white font-bold float-right py-2 px-3 border border-solid border-indigo-500 rounded" style={{ backgroundColor: "#0080ff" }}>Logout</button>
            </header>

            <div className="container">
                {filters.length > 0 && (
                    <div className={`flex bg-white shdow-md -my-16 mb-20 mx-10 p-6 rounded z-10 relative`}>
                        {filters.map((filter) => (
                            <span className="cursor-pointer mr-4 mb-4 rounded font-bold text-indigo-500 bg-indigo-100 p-2 sm:mb-0"
                                onClick={() => handleFilterClick(filter)}>
                                <span
                                    className=''>x {filter}
                                </span>
                            </span>
                        ))}
                        <button onClick={clearFilters} className="font-bold text-gray-700 ml-auto border border-solid">Clear</button>
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
                                    handletagClick={handletagClick} />
                            ))
                        )
                }

                <div>

                    <Container>
                        <button type="button" onClick={openModal} style={{ backgroundColor: "#0080ff" }} nClick={openModal} className="text-white rounded-full border border-gray-100 bg-blue-500 p-6 text-lg"> <FaPlus /></button>

                        <Modal open={modalOpen} close={closeModal} header="새로운 채팅방 만들기" >
                        </Modal>

                    </Container>
                </div>
            </div>
        </>
    );
}
