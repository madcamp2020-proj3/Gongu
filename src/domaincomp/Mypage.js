import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


export default function Mypage({ close, userid, roominfo, idinfo }) {
    const history = useHistory();

    function goToRoom(roomId) {
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

    var idx = -2; var id = -2;
    function handleEntrance(el) {

        if (Array.isArray(roominfo)) {
            idx = roominfo.indexOf(el.el);

            if (Array.isArray(idinfo)) {
                id = idinfo[idx];
                goToRoom(id);
            }
        }
    }

    return (
        <>
            <Modal.Header style={{ backgroundColor: "#f4f5f9" }}>현재 참여 중인 채팅방
            <button className="close" onClick={close}> &times; </button> </Modal.Header>

            <Modal.Body>
                <Form className="flex flex-col">{roominfo.map(el =>
                    <span onClick={() => handleEntrance({ el })} className="cursor-pointer mb-2 shadow-sm items-center pl-3 p-2 font-bold">{el}</span>)}
                </Form>
            </Modal.Body>
        </>
    )
}
