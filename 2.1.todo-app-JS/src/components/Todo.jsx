import { useEffect, useRef, useState } from "react"
import addTo from "../assets/addTo.svg"
import { TodoItems } from "./TodoItems.jsx"


export function Todo(params) {

    const [todolist, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")): []);
    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") {
            return null;
        }
        const newTodo = {
           id: Date.now(),
           text: inputText,
           isComplete: false,
        }
       // React asegura que prev siempre tiene la versión más reciente del estado.
        setTodoList((prev) => [...prev, newTodo])
        inputRef.current.value = ""
    }

    const deleteTodo = (id) =>{
        setTodoList((prevTodos) => (
            prevTodos.filter(item => item.id !== id)
        ))
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => (
            prevTodos.map(item => {
                if (item.id === id) {
                //Si item.isComplete es false, !item.isComplete será true
                    return {...item, isComplete: !item.isComplete}
                }
                // Se ejecuta si el `if` es falso
                return item;
            })
        ))
    }

// Usaremos esto para poder ver el cambio cuando cambie el componente al hacer click y ver que cambia a true
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todolist))
    },[todolist])

    return (
        <>
            <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
{/* Title */}
                <div className="flex items-center mt-7 gap-2">
                    <img className="w-8" src={addTo} alt="" />
                    <h1 className="text-3xl font-semibold">To-Do List</h1>
                </div>

{/* input box */}
            <div className="flex items-center my-7 bg-gray-200 rounded-full">
                <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600" type="text" placeholder="Add your task"/>
                <button onClick={add} className="border-none rounded-full bg-indigo-500 w-32 h-14 text-white text-lg font-medium cursor-pointer">Add +</button>
            </div>

{/* Todo List */}
            <div>
                {todolist.map((item, index) => (
                    <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
                ))}
            </div>

            </div>
        </>
    )
}
