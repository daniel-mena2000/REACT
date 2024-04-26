

export function TaskList({task}){
   

    // Mensaje si no hay nada en el array de tareas
    if (task.length === 0) {
        return <h1>No hay tareas para mostrar</h1>
    }

    return(
        <>
           {
            task.map(item => (
            <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>))
           } 
        
        </>
    )
}