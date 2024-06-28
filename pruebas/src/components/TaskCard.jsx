

export function TaskCard({item, eliminarTarea}) {
  

    return(
        <>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => eliminarTarea(item.id) }>Eliminar</button>
        </>
    )
}