import { useState } from "react"

export function Form({agregarTareas}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        agregarTareas({
            title,
            description
        })
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Escribe tu tarea" onChange={(e) => setTitle(e.target.value)}/>
            <textarea placeholder="Descripcion" onChange={(e) => setDescription(e.target.value)}></textarea>
            <button>Agregar</button>
        </form>
        </>
    )
}