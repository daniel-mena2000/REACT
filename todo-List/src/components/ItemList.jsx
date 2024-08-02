


export function ItemList({item, eliminar}) {
   
    return(
        <>
             <h3>{item.title}</h3>
             <p>{item.description}</p>
             <button onClick={() => eliminar(item.id)}>Eliminar</button>
        </>
    )
}