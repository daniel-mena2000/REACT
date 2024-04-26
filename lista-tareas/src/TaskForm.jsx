import { useState } from "react"

export function TaskForm({createTask}){
    const [title, setTitle] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
    
        createTask(title)
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input placeholder="Escribe tu tarea" onChange={
// Guardamos el valor del input en el actualizador del estado
                (e) => {setTitle(e.target.value)}
            }/>
            <button>Guardar</button>

        </form>
        </>
    )
}