


export function ListaTareas({rederLista}){
    return(
        <>
            {
                rederLista.map(item => (
                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))
            }
        </>
    )
}