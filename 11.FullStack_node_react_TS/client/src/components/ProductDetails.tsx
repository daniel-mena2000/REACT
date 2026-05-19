import type { ProductType } from "../types"
import { formatCurrency } from "../utils"
import { FaEdit } from "react-icons/fa";
import { FiCornerDownRight } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom" // Podemos usar Link o useNavigater, este ultimo nos permite llamarlo antes o despues del return Link solo en el return
import { deleteProduct } from "../services/ProductServer"
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
type ProductDeatilsProps = {
    item: ProductType
}

export async function action({params}: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(Number(params.id))
        return redirect('/')
    }



}

export default function ProductDetails({item}: ProductDeatilsProps) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailability = item.availability
    return(
         <tr className="border-b ">
       <td className="p-3 text-lg text-gray-800">
            <div className="flex items-center gap-2">
                <FiCornerDownRight className="text-gray-400" />
                    {item.name}
            </div>
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(item.price)}
        </td>

        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button
                type="submit"
                name="id"
                value={item.id}
                className={`flex items-center justify-center gap-2 w-full px-3 py-1 rounded-lg border transition
                     ${isAvailability ? 'text-green-500 border-green-500/30 bg-indigo-50 hover:bg-green-500/20'
                         : 'text-red-500 border-red-500/30 bg-red-500/10 hover:bg-red-500/20'}`}
                >

                    {isAvailability ? <> <FaCheckCircle />  Disponible</> : <> <FaTimesCircle />No disponible</>}
                </button>
            </fetcher.Form>
        </td>

        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
{/* dentro de navigate nos permitira usar un state, y toda la informacion de ese state se pasara a la ruta que tenga ese navigate, en este caso le pasaremos toda la informacion del "item" y en el otro lado usaremos useLocation para manipular item <- ESTO YA NO SE APLICO*/}
               <button
                    onClick={() => navigate(`/productos/${item.id}/editar`)}
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold uppercase transition hover:bg-orange-400 active:scale-95"
                    >
                    <FaEdit className="text-sm" />
                    Editar
                </button>
                <Form className="w-full" method="post" action={`/productos/${item.id}/eliminar`}
                 onSubmit={(e) => {
                    if (!confirm('Desea eliminar?')) {
                        e.preventDefault()
                    }
                 }}
                >
                       <button
  type="submit"
  className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold uppercase hover:bg-red-600 transition"
>
  <MdDeleteForever className="text-base" />
  Eliminar
</button>
                </Form>
            </div>
        </td>
    </tr>
    )
}
