import { Link, Form, useActionData,redirect , type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { ErrorMessage } from "../components/ErrorMessage"
import { getProductsById } from "../services/ProductServer";
import { updateProduct } from "../services/ProductServer";
import { FaHome } from "react-icons/fa";
import type { ProductType } from "../types";
import { ProductForm } from "../components/ProductForm";

export async function loader({params}: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const product = await getProductsById(Number(params.id))
        if (!product) {
            throw new Response("", {status: 404, statusText: "No encontrado :["});
        }
        return product

    }

}


export async function action({request, params}: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatoris'
    }
    if (error.length) {
        return error
    }
      if (params.id !== undefined) {
          await updateProduct(data, Number(params.id))
          return redirect('/')
      }
}

const availabilityOptions = [
   { name: 'Disponible', value: true},
   { name: 'No Disponible', value: false}
]

export default function EditProduct() {

    const error = useActionData() as string
    const product = useLoaderData() as ProductType


    return(
        <>
             <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                to='/'
                  className="flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95">
                    <FaHome />
                    Inicio
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage> }

            <Form className="mt-10"
                method="POST"
            >

            <ProductForm product={product} />


                 <div className="mb-4">
                    <label className="text-gray-800" htmlFor="availability" >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                 <input
                    type="submit"
                   className="w-full p-3 rounded-md font-bold text-lg text-white bg-linear-to-r from-blue-500 to-blue-800 hover:opacity-90 transition cursor-pointer"
                   value={'GUARDAR CAMBIOS'}
                />
                </Form>
        </>
    )
}
