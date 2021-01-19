import { FaRegFileCode } from "react-icons/fa";
import React, {useState, useEffect, useRef} from 'react'
import { propTypes } from "react-bootstrap/esm/Image";
import {Form, InputGroup, Button} from 'react-bootstrap'

function TodoForm(props) {
    const [input, setInput] = useState('')

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    },[])

    const handleChange = e => {
        setInput(e.target.value);
    }

    const colors = ['#ffbedc', "#bcfdff", "#fffb9f" ]

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random()*10000),
            text: input,
            color: colors[Math.floor(Math.random()*10000)%3]
        });

        setInput('');

       
    };

    return(
        <form className="todo-form flex" onSubmit={handleSubmit}>
             <InputGroup>
             <Form.Control type="text" placeholder="메모를 입력하세요" value={input} name="text" className="todo-input w-56 border rounded" onChange={handleChange} ref={inputRef}></Form.Control>

                        <InputGroup.Append>
                            <Button variant="outline-primary" type="submit" className="todo-button ">+</Button>
                        </InputGroup.Append>
                    </InputGroup>

            {/* <button className="todo-button w-5 ml-auto push mr-1 px-2">+</button> */}
            
        </form>
    )
}

export default TodoForm