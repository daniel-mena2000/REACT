import { useState } from "react"
import type { ListBasic } from "../types"

type FormProps = {
    agregarTarea: (info: ListBasic) => void
}
function Form({agregarTarea}: FormProps) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        agregarTarea({
            nombre,
            descripcion
        })
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setNombre(e.target.value)}/>
            <textarea onChange={(e) => setDescripcion(e.target.value)}></textarea>
            <button>Agregar</button>
        </form>
    )
}

export default Form
