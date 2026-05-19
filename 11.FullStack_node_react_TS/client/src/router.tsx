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
                path: 'productos/:id/editar', 
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
