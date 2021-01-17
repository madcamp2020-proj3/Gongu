import React, { useState, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function Mypage({ closeModal }) {
    const idRef = useRef();
    const pwRef = useRef();
    const pw2Ref = useRef();

    const [show, setShow] = useState(false);

    function handleOnClick(e) {
        e.preventDefault();
        // Check is there a blank
        if (idRef.current.value === "" || pwRef.current.value === "" || pw2Ref.current.value === "") {
            return;
        }
        
        fetch('http://192.249.18.236:3001/mypage'             
        )
            .then(res => res.json())
            .then(res => {
                if (res.room) {
                    // show modal
                } else {
                    closeModal();
                }
            })
    }
    return (
        <>
            <Modal.Header closeButton>Mypage</Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>아이디</Form.Label>
                        <Form.Control ref={idRef} type="tetx" required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control ref={pwRef} type="password" required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>비밀번호 재확인</Form.Label>
                        <Form.Control ref={pw2Ref} type="password" required></Form.Control>
                    </Form.Group>
                    <Button onClick={handleOnClick}>가입하기</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
