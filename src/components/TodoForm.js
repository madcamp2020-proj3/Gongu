import { FaRegFileCode } from "react-icons/fa";
import React, {useState, useEffect, useRef} from 'react'
import { propTypes } from "react-bootstrap/esm/Image";

function TodoForm(props) {
    const [input, setInput] = useState('')

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random()*10000),
            text: input
        });
        setInput('');
    };

    return(
        <form className="todo-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="메모를 입력하세요" value={input} name="text" className="todo-input w-48" onChange={handleChange} ref={inputRef}></input>
            <button className="todo-button w-5">+</button>
            
        </form>
    )
}

export default TodoForm