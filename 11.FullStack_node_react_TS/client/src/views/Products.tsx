import { Link, useLoaderData, type ActionFunctionArgs} from "react-router-dom"
import { getProducts } from "../services/ProductServer";
import ProductDetails from "../components/ProductDetails";
import type { ProductType } from "../types";
import { updateProductAvailability } from "../services/ProductServer";

export async function loader() {
    const products = await getProducts()
    return products
}

export async function action({request}: ActionFunctionArgs) {
   const data = Object.fromEntries(await request.formData())

   await updateProductAvailability(Number(data.id))

//Ya no usamos redirect gracias a const fetcher = useFetcher() en "ProductDetails"
}

export default function Products() {
//usamos useLoaderData para traer los datos de la funcion loader al componente
//Forzamos a que Ts tome "products" como un array para poder tiparlo y recorrerlo
    const products = useLoaderData() as ProductType[]

    return(
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link
                to='/productos/nuevo'
                className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700">
                    Agregar Producto
                </Link>
            </div>

            <div className="p-2">
  <table className="w-full mt-5 table-auto">
    <thead className="bg-teal-900 text-white">
        <tr>
            <th className="p-2">Producto</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Disponibilidad</th>
            <th className="p-2">Acciones</th>
        </tr>
    </thead>
    <tbody>
        {products.map(item => (
            <ProductDetails
                key={item.id}
                item={item}
            />
        ))}

    </tbody>
  </table>
</div>


        </>
    )
}
