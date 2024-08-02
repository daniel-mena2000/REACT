import { ItemList } from "./ItemList.jsx"
export function List({task, eliminar}) {

    if (task.length === 0) {
        return <h3>No hay tareas por mostrar</h3>
    }
    return(
        <>
            {task.map(item => (
                <div key={item.id}>
                    <ItemList item={item} eliminar={eliminar}/>
                </div>
            ))}
        </>
    )
}