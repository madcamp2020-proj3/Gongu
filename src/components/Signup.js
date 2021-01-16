import React, { useState, useRef } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function Signup({ closeModal }) {
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
        // Send Data to DB
        fetch('http://192.249.18.236:3001/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": idRef.current.value,
                "pw": pwRef.current.value,
                "pw2": pw2Ref.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.token) {
                    closeModal()
                } else {
                    setShow(true);
                }
            })
    }
    return (
        <>
            <Modal.Header closeButton>회원 가입</Modal.Header>
            {
                show ?
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <p>비밀번호가 같지 않습니다.</p>
                    </Alert> :
                    <></>
            }
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
