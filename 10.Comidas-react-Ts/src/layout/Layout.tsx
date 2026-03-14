import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { RecipeModal } from "../components/Modal/Modal";

export function Layout() {
    return(
        <>
        <Header/>

        <main>
            <Outlet />
        </main>

        <RecipeModal/>
        </>

    )
}
