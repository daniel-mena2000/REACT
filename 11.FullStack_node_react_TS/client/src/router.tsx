import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products  from "./views/Products";
import NewProduct, {action as newProductAction} from "./views/NewProduct";
import EditProduct, {loader as editProductLoader} from "./views/EditProduct";
import { loader as productsLoader} from "./views/Products";
import { action as editProductAction} from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";
import { action as updateAvailibilityAction } from "./views/Products";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
//Children las paginas que esten en este array seran hijas de "Layout" por lo tanto su contenido se inyecta en "Outlet", y podremos tener multiples layouts, uno para la autenticacion, cuando ya este autenticado, etc. cada pagina tiene que ir en su respectivo objeto
//Lo que decimos aqui es quiero cargar products, cuando carguemos la pagina principal, y aparte de indicarle la ruta del componente le decimos index: true, para que sepa que efectivamente lo queremos cargar en la pagina principal
//⚠️ action (aquí el matiz importante) No es cualquier botón 👀👉 Se ejecuta SOLO cuando se envía un <Form> de React Router
//LOADER✔️ Se ejecuta automáticamente cuando entras a la ruta ✔️ Sirve para traer datos (GET)

        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailibilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
//ROA = Resource-Oriented Architecture (o Design) 👉 Es un estilo donde todo gira alrededor de recursos
//“productos” → el recurso “:id” → un recurso específico “editar” → acción sobre ese recurso
//En lugar de pensar: "quiero ejecutar una función" Piensas:"quiero manipular un recurso"
                path: 'productos/:id/editar', //ROA Pattern - Resourse-oriented desing
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])
