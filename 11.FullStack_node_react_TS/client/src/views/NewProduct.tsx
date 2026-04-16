import { Link, Form, useActionData,redirect , type ActionFunctionArgs } from "react-router-dom"
import { ErrorMessage } from "../components/ErrorMessage"
import { addProduct } from "../services/ProductServer"
import { ProductForm } from "../components/ProductForm"


export async function action({request}: ActionFunctionArgs) {
//Obtener los datos de formData() del request del formulario. Importante que el input tenga el **name** para asignar los valores, Object.fromEntries para sacar la info de formData. es decir lo que se escribio en el formulario
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatoris'
    }
//Si error tiene algo lo retornamos, en el momento en que tu retornas algo en tus acciones osea en el "action" estan estan disponibles en el componente(newProduct) por medio de un hook llamado useActionData()
    if (error.length) {
        return error
    }
//Hasta que esto no finalice no pasa a lo siguiente, para es el await
    await addProduct(data)
//Si ya termino el await redireccionamos a la pagina principal
    return redirect('/')
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

               <ProductForm/>


                <input
                    type="submit"
                   className="w-full p-3 rounded-md font-bold text-lg text-white bg-linear-to-r from-indigo-600 to-indigo-800 hover:opacity-90 transition cursor-pointer"
                   value={'AGREGAR PRODUCTO'}
                />
                </Form>
        </>
    )
}
