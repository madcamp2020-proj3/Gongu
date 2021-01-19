import React from 'react';
import Hippo from './icons8-hippo-96.svg'
import TodoList from './TodoList'

function setlogo(logo){
    if (logo === null){
    return Hippo;
    }
    else return logo;
}

export default function Contact({ room }) {
   
    let loogo = room['logo']
    let tags = room['category']
    console.log("방 정보: ", room);
    return (
        <div className='container float-none'>
            <div className="pb-2 border-b border-gray-300">
                <div className='flex flex-col flex-wrap content-center'>
                    <div className="mt-2 font-bold text-xl self-center ">{room['title']}</div>
                    <img className="mt-3 mb-3 w-24 h-24 self-center"
                        src={setlogo(loogo)}
                        alt=""
                        style={{borderRadius: "50%", backgroundColor:"#b1bade"}}></img>
                    <div className="self-center mb-2 text-lg">{room['subtitle']}</div>
                    <div>{room['startDate']} ~ {room['endDate']}</div>
                    <div className="self-center mb-2">{room['location']}</div>
                </div>

                <div className="flex flex-wrap justify-center">
                {tags ? tags.map((tag) => (
                        <span className="self-center text-indigo-500 bg-indigo-100 rounded mr-2 px-2 py-1 mb-1">{tag}</span>
                    ))
                    : ("")}
                </div>
            </div>
            <div className="mt-3">
            <TodoList /></div>
           
        </div>
    )
}
