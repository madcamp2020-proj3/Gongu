import React, {useState} from 'react'
import TodoForm from './TodoForm'
import {RiCloseCircleLine} from 'react-icons/ri'
import {TiEdit} from 'react-icons/ti'
import {Row} from 'react-bootstrap'

function Todo({todos, completeTodo, removeTodo, updateTodo, color}){
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ""
        })
    }

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}></TodoForm>;
    }

    return todos.map((todo, index) => (
        
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div style={{backgroundColor: todo.color}} className="mt-2 shadow-md border rounded">
                <div  className="p-2 " key={todo.id} onClick={() => completeTodo(todo.id)}>{todo.text}</div>
                <div className="icons p-1 flex flex-wrap justify-end py-2">
                    <RiCloseCircleLine onClick={() => removeTodo(todo.id)} 
                    className='delete-icon cursor-pointer mr-1'/>    
                    <TiEdit onClick={() => setEdit({id: todo.id, value: todo.text})} 
                    className='edit-icon cursor-pointer'/>
                </div>
            </div>
        </div>
    ))
}

export default Todo