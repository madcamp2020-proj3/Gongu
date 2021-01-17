import React, { useState, useRef } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


export default function Mypage({ close, userid, roominfo, idinfo }) {
    const history = useHistory();

    function goToRoom(roomId) {
        console.log(roomId);
        fetch("http://192.249.18.236:3001/entrance", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "roomId": roomId,
                "userId": userid
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.recipients != undefined) {
                    history.push('/chatroom/' + roomId);
                }
            })
            .catch(

            );
    }
    function handleclick(e){
        e.preventDefault();
        e.stopPropagation();
    }
    function handleEntrance(el) {
        // e.preventDefault();
        console.log("클릭하였습니다.");
        console.log(el);

        goToRoom(el.el);}
    
    var idx = 0; var id =0;
    // function handleEntrance(el) {
    //     // e.preventDefault();
    //     console.log("클릭하였습니다.");
    //     console.log(el);

    //     const findin = (element) => element == el;

    //     if(Array.isArray(roominfo)){
    //     idx = roominfo.indexOf(el);
    //     console.log(idx+"1");
    //     if(Array.isArray(idinfo)){
    //         console.log(idinfo);
    //     // id = idinfo.get(idx);}
    //     console.log(idx);
    //     goToRoom(id);}}
    // }
    return (
        <>
            <Modal.Header style={{backgroundColor: "#f4f5f9"}}>현재 참여 중인 채팅방
            <button className="close" onClick={close}> &times; </button> </Modal.Header>

            <Modal.Body>
                <Form>{idinfo.map(el => 
                    <div className="flex mb-2 shadow-sm items-center pl-3 p-2 font-bold">{el}
                    <Button onClick={handleclick, handleEntrance({el})} className="ml-auto push" variant="outline-primary">바로가기</Button></div>)}
                    
                </Form>
            </Modal.Body>
        </>
    )
}
