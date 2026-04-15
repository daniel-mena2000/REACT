import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import NewProduct, {action as newProductAction} from "./views/NewProduct";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
//Children las paginas que esten en este array seran hijas de "Layout" por lo tanto su contenido se inyecta en "Outlet", y podremos tener multiples layouts, uno para la autenticacion, cuando ya este autenticado, etc. cada pagina tiene que ir en su respectivo objeto
//Lo que decimos aqui es quiero cargar products, cuando carguemos la pagina principal, y aparte de indicarle la ruta del componente le decimos index: true, para que sepa que efectivamente lo queremos cargar en la pagina principal
        children: [
            {
                index: true,
                element: <Products />
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction
            }
        ]
    }
])
