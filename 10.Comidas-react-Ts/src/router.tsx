import {BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesPage } from "./views/FavoritesPage";
import { IndexPage } from "./views/IndexPage";
import { Layout } from "./layout/Layout";


export function AppRouter() {
        return(
            <BrowserRouter  >
                <Routes>
                    <Route element={<Layout/>}>
                        <Route index element={ <IndexPage/> } />
                        <Route path="/favorites"  element={ <FavoritesPage/> }/>
                    </Route>
                </Routes>
        </BrowserRouter>
        )
}
