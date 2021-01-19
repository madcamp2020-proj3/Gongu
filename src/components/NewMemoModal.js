import { Modal, Form, Button } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import { useContacts } from '../contexts/ContactsProvider';

export default function NewcontactModal({ closeModal }) {
    const idRef = useRef();
    const nameRef = useRef();
    const [memo, setMemo] = useState([]);
    // const { createContact } = useContacts();

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     createContact(idRef.current.value, nameRef.current.value);
    //     closeModal();
    // }

    return (
        <>
            <Modal.Header  style={{ backgroundColor: "#f4f5f9" }} closeButton id="contained-modal-title-vcenter">새로운 메모 만들기</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <label>공동구매를 위해 꼭 필요한 정보를 메모로 남겨주세요!</label>
                      
                        <textarea className='form-control' rows='10' />
                        {/* <label className="mt-2">(메모 작성 후에는 수정이 불가하니, 신중하게 작성해 주세요.)</label> */}
                    </Form.Group>
                   
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
