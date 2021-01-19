import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'

function TodoList({existMemo}) {
    const [todos, setTodos] = useState([]);
    const path = window.location.pathname;
    const parseData = path.split('/')[path.split('/').length - 1];
    // console.log("exist", existMemo);
    // const inputRef = useRef(null)

    useEffect(() => {
        if (existMemo !== undefined){
            setTodos(existMemo)
        }
    },[existMemo])

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos]
        setTodos(newTodos)

        fetch('http://192.249.18.236:3001/addmemo/'+parseData, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
        .then(res => {
            console.log(res)
        })        
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        })
        setTodos(updatedTodos);
    }
    
    return(
        <div>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    )
}

export default TodoList