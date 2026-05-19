import { Link, Form, useActionData,redirect , type ActionFunctionArgs } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { ErrorMessage } from "../components/ErrorMessage"
import { addProduct } from "../services/ProductServer"
import { ProductForm } from "../components/ProductForm"


export async function action({request}: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatoris'
    }
    if (error.length) {
        return error
    }
    await addProduct(data)
    return redirect('/')
}

export default function NewProduct() {

    const error = useActionData() as string

    return(
        <>
             <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
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

               <ProductForm/>


                <input
                    type="submit"
                   className="w-full p-3 rounded-md font-bold text-lg text-white bg-linear-to-r from-blue-500 to-blue-800 hover:opacity-90 transition cursor-pointer"
                   value={'AGREGAR PRODUCTO'}
                />
                </Form>
        </>
    )
}
