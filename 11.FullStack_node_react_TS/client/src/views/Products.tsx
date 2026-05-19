import { Link, useLoaderData, type ActionFunctionArgs} from "react-router-dom"
import { getProducts } from "../services/ProductServer";
import ProductDetails from "../components/ProductDetails";
import { IoMdAddCircle } from "react-icons/io";
import type { ProductType } from "../types";
import { updateProductAvailability } from "../services/ProductServer";

export async function loader() {
    const products = await getProducts()
    return products
}

export async function action({request}: ActionFunctionArgs) {
   const data = Object.fromEntries(await request.formData())

   await updateProductAvailability(Number(data.id))

}

export default function Products() {
    const products = useLoaderData() as ProductType[]

    return(
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link to="/productos/nuevo"
                    className="flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
                >
                    <IoMdAddCircle className="text-lg" />
                        Agregar Producto
                </Link>
            </div>

            <div className="p-2">
  <table className="w-full mt-5 table-auto">
    <thead className="bg-blue-500 text-white">
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
