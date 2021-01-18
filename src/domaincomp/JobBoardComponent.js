import React from 'react';

function setlogo(id, logo){
    if (logo === null){
    return "images/icons8-hippo-96.svg"
    }
    else return logo;
}

const JobBoardComponent = ({ job:
    { id, logo, title, startDate, endDate, subtitle, location, category, members, personnel },
    handletagClick, goToRoom, key, isNew
}) => {
    const tags = [];

    function handleEntrance(e) {
        e.preventDefault();
        goToRoom(id);
    }

    if (category) {
        tags.push(...category);
    }

    return (
        <div className={`flex flex-col bg-white shadow-md my-16 mx-10 p-6 rounded ${isNew && 'border-l-4 border-indigo-200 border-solid'} sm:flex-row sm:my-8`}>
            <div className="flex sm:flex-col justify-between">
                <img className="-mt-16 mb-4 w-24 h-24 sm:h-24 sm:w-24 sm:my-0"
                    src={setlogo(id, logo)}
                    alt=""
                    style={{borderRadius: "50%", backgroundColor:"#b1bade"}}></img>
                <button onClick={handleEntrance}
                    className="-mt-1 bg-indigo-100 text-indigo-600 px-4 sm:px-2 sm:py-1 font-bold text-lg border rounded border-solid border-indigo-700 sm:my-0 ">
                    입장
            </button>
            </div>

            <div className="flex flex-col justify-between ml-4">
                <h3 className="text-lg font-bold text-indigo-500 my-2">
                    {location}
                    {isNew && (
                        <span className="bg-indigo-500 text-indigo-100 font-bold m-2 py-1 px-2 rounded-full uppercase text-sm">
                            Now
                        </span>
                    )}
                </h3>
                <h2 className="font-bold text-xl my-2">{title}</h2>
                <p className="text-gray-700 my-2">
                    {subtitle}
                </p>
            </div>

            <div className="flex flex-col justify-between ml-auto push mt-3 sm:mt-0">
                <h2 className="text-lg text-right mr-4">
                    <span className="text-gray-500">{startDate}</span>
                    <span className="text-gray-500"> ~ </span>
                    <span className="text-gray-500">{endDate}</span>
                    <span className="text-gray-700 ml-4">{members}</span>
                    <span className="text-gray-700 ">/</span>
                    <span className="text-gray-700 ">{personnel}</span>
                </h2>

                <h1 className="flex flex-wrap ml-auto push items-end mt-2 mr-4 mx-0 pt-4 border-t border-gray-500 border-solid sm:ml-auto sm:border-0 sm:pt-0 sm:mt-0 sm:justify-center">
                    {tags ? tags.map((tag) => (
                        <span
                            onClick={() => handletagClick(tag)}
                            className="cursor-pointer text-indigo-500 bg-indigo-100 font-bold ml-4 mb-4 p-2 rounded sm:mb-0 text-lg">
                            {tag}
                        </span>
                    ))
                        : ("")}
                </h1>
            </div>
        </div>

    );
}

export default JobBoardComponent;