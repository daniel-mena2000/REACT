import { useState } from "react"


export function Form({agregar}) {
    const [title, setTile] = useState("");
    const [description, setDescription] = useState("")

    function handelForm(e) {
        e.preventDefault()
        agregar({
            title,
            description
        })
    }
    return(
        <>
            <form onSubmit={handelForm}>
                <input type="text" onChange={(e) => setTile(e.target.value)}/>
                <textarea onChange={e => setDescription(e.target.value)}></textarea>
                <button>Agregar</button>
            </form>
        </>
    )
}