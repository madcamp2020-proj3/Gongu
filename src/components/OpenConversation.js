import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation({ myId }) {
    const [text, setText] = useState('');
    const { sendMessage, conversations } = useConversations();
    const path = window.location.pathname;
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true });
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        fetch('http://192.249.18.236:3001' + path)
            .then(res => res.json())
            .then(result => {
                const idx = result.recipients.indexOf(myId);
                result.recipients.splice(idx, 1);
                sendMessage(
                    result.recipients,
                    text
                );
            });
        setText('');
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {
                        conversations.length == 0
                            ? <></>
                            : conversations[0].messages.map((message, index) => {
                                const lastMessage = conversations[0].messages.length - 1 === index;
                                return (
                                    <div
                                        ref={lastMessage ? setRef : null}
                                        key={index}
                                        className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end aligb-items-end' : 'align-items-start'}`}>
                                        <div className="d-flex items-center">
                                            {message.fromMe ?
                                                <span className="inline-block text-gray-600 text-xs px-1">
                                                    11:23
                                                </span> :
                                                <></>
                                            }
                                            <div
                                                className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border bg-white'}`}>
                                                {message.text}
                                            </div>
                                            {!message.fromMe ?
                                                <span className="inline-block text-gray-600 text-xs px-1">
                                                    11:23
                                                </span> :
                                                <></>
                                            }

                                        </div>
                                        <div className={`text-muted smamll ${message.fromMe ? 'text-right' : ''}`}>
                                            {message.fromMe ? 'You' : message.sender}
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            required
                            value={text}
                            onChange={e => setText(e.target.value)} />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
