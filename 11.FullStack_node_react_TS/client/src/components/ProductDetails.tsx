import type { ProductType } from "../types"
import { formatCurrency } from "../utils"
import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom" // Podemos usar Link o useNavigater, este ultimo nos permite llamarlo antes o despues del return Link solo en el return
import { deleteProduct } from "../services/ProductServer"
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
type ProductDeatilsProps = {
    item: ProductType
}

export async function action({params}: ActionFunctionArgs) {
//console.log(params.id);
    if (params.id !== undefined) {
        await deleteProduct(Number(params.id))

        //para que no se vaya a la ruta: productos/${item.id}/eliminar que indicamos en el action, redirigimos a la pagina principal cuando se de click en eliminar, ya que solo elimina no queremos una interfaz de la ruta de eliminar.
    return redirect('/')
    }



}

export default function ProductDetails({item}: ProductDeatilsProps) {
//con Link: <Link to={`/productos/${item.id}/editar`}>Editar</Link> <-- Esto irira en lugar del button
//useFetcher de React Router (v6.4+) es una herramienta para hacer acciones (POST, PUT, DELETE) o loaders SIN cambiar de ruta. Es decir: haces una petición al servidor pero te quedas en la misma página, sin navegación. En este caso cambiamos la disponibilidad, sin cambiar de pagina, como un like en facebook
    const fetcher = useFetcher()

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
{/* dentro de navigate nos permitira usar un state, y toda la informacion de ese state se pasara a la ruta que tenga ese navigate, en este caso le pasaremos toda la informacion del "item" y en el otro lado usaremos useLocation para manipular item*/}
                <button onClick={() => navigate(`/productos/${item.id}/editar`)}
                className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"

                    >
                    Editar
                </button>
{/**Para eliminar creamos el Form de boton, en este caso le pasaremos el action aqui 👉 React Router:
👉 React Router - Busca esa ruta:
productos/:id/eliminar
Ejecuta su action
Luego procesa el redirect('/')
Vuelve a cargar el loader de /*/}
                <Form className="w-full" method="post" action={`/productos/${item.id}/eliminar`}
                 onSubmit={(e) => {
                    if (!confirm('Desea eliminar?')) {
                        e.preventDefault()
                    }
                 }}
                >
                        <input type="submit" value='Eliminar'
                        className="bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
                        />
                </Form>
            </div>
        </td>
    </tr>
    )
}
