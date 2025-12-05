import type { List } from "../types"

type taskProps = {
    task: List[]
    eliminar: (id: List['id']) => void

}
export function CartList({task, eliminar}: taskProps) {
    return(
        <div className="task-list">
            {task.map(item => (
                <div key={item.id} className="task-card">
                    <h3>{item.nombre}</h3>
                    <p>{item.descripcion}</p>
                    <button onClick={() => eliminar(item.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    )
}

export default CartList
