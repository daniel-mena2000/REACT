import { useState } from "react"


export function FormTareas({info}){

    const [tareaUsuario, setTareaUsuario] = useState("");

        function handleTask(e){
            e.preventDefault()
            info(tareaUsuario)
        }
        return(
            <>
            <form onSubmit={handleTask}>
            <input type="text" onChange={(e) => {setTareaUsuario(e.target.value)}
        }/>
            <button>Agregar</button>
                </form>
            </>
        )
}