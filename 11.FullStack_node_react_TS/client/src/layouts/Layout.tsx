import { Outlet } from "react-router-dom"
import { LiaStoreAltSolid } from "react-icons/lia";

export default function Layout() {
    return(
        <>
        <header className="bg-blue-500">
            <div className="mx-auto max-w-6xl py-10 flex justify-center">

                <h1 className="text-4xl font-extrabold text-white flex items-center gap-2 ">
                    <LiaStoreAltSolid />
                     Administrador de Productos
                </h1>
            </div>
        </header>

        <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
            <Outlet/>
        </main>


        </>

    )
}
