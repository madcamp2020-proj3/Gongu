import React, { useState, useRef } from 'react'
import { Container, Form, Button, Modal, Alert } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import Signup from './Signup';
import { Row } from 'react-bootstrap';


export default function Loginpage({ onIdSubmit, onLoginAdmit }) {
    const idRef = useRef();
    const pwRef = useRef();
    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const [loginAlertOpen, setLoginAlertOpen] = useState(false);
    const [newUser, setNewUser] = useState(true);

    function handleOnClick(e) {
        e.preventDefault();
        fetch('http://192.249.18.236:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": idRef.current.value,
                "pw": pwRef.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.token) {
                    console.log(typeof onLoginAdmit);
                    admitLogin();
                } else {
                    if (res.type == 1) {
                        console.log("회원 정보가 없습니다.");
                        setNewUser(true);
                    } else {
                        console.log("비밀번호가 일치하지 않습니다.");
                        setNewUser(false);
                    }
                    setLoginAlertOpen(true);
                }
            })
    }

    function admitLogin() {
        onIdSubmit(idRef.current.value);
        // save in local storage
        onLoginAdmit(true);
    }

    function closeSignupModal() {
        setSignupModalOpen(false);
    }

    return (
        <div>
            {
                loginAlertOpen ?
                    <Alert variant="danger" onClose={() => setLoginAlertOpen(false)} dismissible>
                        <p>
                            {newUser ? "일치하는 회원정보가 없습니다." : "비밀번호가 일치하지 않습니다."}
                        </p>
                    </Alert> :
                    <></>
            }

            <div className="mt-56 space-y-20 font-mono" style={{justifyContent: "center", alignItems: "center", display:"flex"}}>
                <Row>
                    <div className="text-6xl ml-16  font-bold" style={{ color: "#0080ff" }}>Sy</div>
                    <div className="text-6xl text-white font-bold " style={{ backgroundColor: "#0080ff" }}>no</div>
                </Row>
            </div>

            <Container className="align-items-center d-flex" style={{ height: '40vh' }}>                
                <Form className="w-100">
                    <Form.Group>
                        <Form.Label> Enter Your Id</Form.Label>
                        <Form.Control type="text" ref={idRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Enter Your Password</Form.Label>
                        <Form.Control type="password" ref={pwRef} required></Form.Control>
                    </Form.Group>
                    <Button onClick={handleOnClick} className="mr-2">Login</Button>
                    <Button onClick={() => setSignupModalOpen(true)} variant="secondary">Create A New ID</Button>
                </Form>
            </Container>
            <Modal show={signupModalOpen} onHide={closeSignupModal}>
                <Signup closeModal={closeSignupModal} />
            </Modal>
        </div>
    )
}
