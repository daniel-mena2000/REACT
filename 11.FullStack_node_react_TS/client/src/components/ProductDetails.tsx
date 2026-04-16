import type { ProductType } from "../types"
import { formatCurrency } from "../utils"
import { useNavigate } from "react-router-dom" // Podemos usar Link o useNavigater, este ultimo nos permite llamarlo antes o despues del return Link solo en el return
type ProductDeatilsProps = {
    item: ProductType
}

export default function ProductDetails({item}: ProductDeatilsProps) {
//con Link: <Link to={`/productos/${item.id}/editar`}>Editar</Link> <-- Esto irira en lugar del button

    const navigate = useNavigate()
    const isAvailability = item.availability
    return(
         <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {item.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(item.price)}
        </td>

        <td className="p-3 text-lg text-gray-800">
            {isAvailability ? 'Disponible': 'No disponible'}
        </td>

        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
{/* dentro de navigate nos permitira usar un state, y toda la informacion de ese state se pasara a la ruta que tenga ese navigate, en este caso le pasaremos toda la informacion del "item" y en el otro lado usaremos useLocation para manipular item*/}
                <button onClick={() => navigate(`/productos/${item.id}/editar`)}
                className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
                    >
                    Editar
                </button>
            </div>
        </td>
    </tr>
    )
}
