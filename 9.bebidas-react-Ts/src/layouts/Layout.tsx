import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import Modal from "@/components/Modal"
import { useEffect } from "react"
import { useAppStore } from "@/stores/useAppStore"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//Layout nos ayudara a mostrar el Header en las 2 paginas y para no llamar 2 veces el componente este envolvera a las paginas indicando que se usara en ambas
//Usaremos Outlet para que el contenido se inyecte en las paginas es decir que no sea un componente separado

export function Layout() {
//Cuando cargue nuestro proyecto mandamos llamar el almacenamiento de localstorage
   const loadFromStorage = useAppStore((state) => state.loadFromStorage)


    useEffect(() => {
        loadFromStorage()
    },[])

    return(
        <>
        <Header/>

        <main className="container mx-auto py-16">
            <Outlet/>
        </main>

        <Modal />

  <ToastContainer
   position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
        />
        </>

    )
}
