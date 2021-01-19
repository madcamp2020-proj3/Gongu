import React from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {star} from 'react-icons/fa';

export default function Mypage({ close, userid, roominfo, idinfo, ownerinfo }) {
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

    var idx = -2; var id = -2; var idd = -2;
    function handleEntrance(el) {

        if (Array.isArray(roominfo)) {
            idx = roominfo.indexOf(el.el);

            if (Array.isArray(idinfo)) {
                id = idinfo[idx];
                goToRoom(id);
            }
        }
    }

    function checkowner(el) {
        if (Array.isArray(roominfo)) {
            idd = roominfo.indexOf(el.el);

            if (Array.isArray(ownerinfo)) {
                if (ownerinfo[idd] == userid) {return "#ebeef5"}
                else return "#FFFFFFFF";
            }
        }
    }

    return (
        <div id="title4">
            <Modal.Header style={{ backgroundColor: "#f4f5f9" }}>현재 참여 중인 채팅방
            <button className="close" onClick={close}> &times; </button> </Modal.Header>

            <Modal.Body>
                <Form className="flex flex-col">{roominfo.map(el =>
                    <div style={{backgroundColor: checkowner({el})}} onClick={() => handleEntrance({ el })} className="cursor-pointer mb-2 shadow-sm items-center pl-3 p-2 font-bold">
                        <Row>
                            <Col>{el}</Col>
                            {/* <Col>{checkowner({el})}</Col> */}
                        </Row></div>)}
                </Form>
            </Modal.Body>
        </div>
    )
}