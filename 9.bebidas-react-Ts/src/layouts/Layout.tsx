import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
//Layout nos ayudara a mostrar el Header en las 2 paginas y para no llamar 2 veces el componente este envolvera a las paginas indicando que se usara en ambas
//Usaremos Outlet para que el contenido se inyecte en las paginas es decir que no sea un componente separado

export function Layout() {
    return(
        <>
        <Header/>

        <main className="container mx-auto py-16">
            <Outlet/>
        </main>
        </>

    )
}
