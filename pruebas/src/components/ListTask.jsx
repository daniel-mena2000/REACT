import { TaskCard } from "./TaskCard.jsx"

export function ListTask({tasks, eliminarTarea}) {

    if (tasks.length === 0) {
        return <h2>No hay tareas por mostrar</h2>
    }
    return(
        <>
            {tasks.map(item => (
                <div key={item.id}>
                    <TaskCard item={item} eliminarTarea={eliminarTarea}/>
                </div>
            ))}
        </>
    )
}