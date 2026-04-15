import { Link, Form, useActionData, type ActionFunctionArgs } from "react-router-dom"
import { ErrorMessage } from "../components/ErrorMessage"
import { addProduct } from "../services/ProductServer"


export async function action({request}: ActionFunctionArgs) {
//Obtener los datos de formData del request. Importante que el formulario tenga el **name** para asignar los valores
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatoris'
    }
//Si error tiene algo lo retornamos, en el momento en que tu retornas algo en tus acciones osea en el "action" estan estan disponibles en el componente(newProduct) por medio de un hook llamado useActionData()
    if (error.length) {
        return error
    }

    addProduct(data)
}

export default function NewProduct() {

    //Lo tipamos como string
    const error = useActionData() as string

    return(
        <>
             <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
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

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="name">Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 rounded-md  border border-indigo-500/20 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 transition"
                        placeholder="Nombre del Producto"
                        name="name"
                    />
                </div>

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="price">Precio:</label>
                        <input
                            id="price"
                            type="number"
                            className="mt-2 block w-full p-3 rounded-md  border border-indigo-500/20 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 transition"
                            placeholder="Precio Producto. ej. 200, 300"
                            name="price"
                    />
                </div>
                <input
                    type="submit"
                   className="w-full p-3 rounded-md font-bold text-lg text-white bg-linear-to-r from-indigo-600 to-indigo-800 hover:opacity-90 transition cursor-pointer"
                />
                </Form>
        </>
    )
}
