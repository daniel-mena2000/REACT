import { Link, Form, useActionData,redirect , type ActionFunctionArgs, type LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { ErrorMessage } from "../components/ErrorMessage"
import { getProductsById } from "../services/ProductServer";
import { updateProduct } from "../services/ProductServer";
import type { ProductType } from "../types";
import { ProductForm } from "../components/ProductForm";

//loader tiene params, para obtener el id del elemento seleccionado de nuestra ruta de router obviamente se necesita que este es como ":id" react-router-dom nos da su tipo que es: LoaderFunctionArgs
export async function loader({params}: LoaderFunctionArgs) {
//Mandamos el id hacia la ruta de getProductsById, comprobamos que no sea undefined
    if (params.id !== undefined) {
//Mandamos traer el producto seleccionado
        const product = await getProductsById(Number(params.id))
        //console.log(product);
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
//Verificamos que no undefined el id, recordar que los params son strings y lo tenemos que pasar a numero
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
                className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700">
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
                   className="w-full p-3 rounded-md font-bold text-lg text-white bg-linear-to-r from-indigo-600 to-indigo-800 hover:opacity-90 transition cursor-pointer"
                   value={'GUARDAR CAMBIOS'}
                />
                </Form>
        </>
    )
}
