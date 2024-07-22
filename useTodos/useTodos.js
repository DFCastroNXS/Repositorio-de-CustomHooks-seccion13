import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer'

//const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Hacer tarea sociales',
    //     done: false,
    // },
//]

const init = () =>{
    return JSON.parse(localStorage.getItem('todos')||[])
}

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))
    },[todos])

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action)
    }

    const handleDeleteTodo=(id)=>{
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        })
    }

    const handleToggleTodo=(id)=>{
        console.log({id});
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })        
    }
    return{
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount:todos.length,
        pendingTodosCount: todos.filter(todo=>!todo.done).length
    }
}
