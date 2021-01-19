import { Modal, Form, Button } from 'react-bootstrap';
import React, { useRef } from 'react';
import { useContacts } from '../contexts/ContactsProvider';

export default function NewcontactModal({ closeModal }) {
    const idRef = useRef();
    const nameRef = useRef();
    // const { createContact } = useContacts();

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     createContact(idRef.current.value, nameRef.current.value);
    //     closeModal();
    // }

    return (
        <>
            <Modal.Header closeButton>새로운 메모 만들기</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        {/* <Form.Control type="text" ref={idRef} required /> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        {/* <Form.Control type="text" ref={nameRef} required /> */}
                    </Form.Group>
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
