import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import Modal from "@/components/Modal"
import { useEffect } from "react"
import { useAppStore } from "@/stores/useAppStore"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Layout() {
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
