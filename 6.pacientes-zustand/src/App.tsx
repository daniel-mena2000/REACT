import {ToastContainer} from 'react-toastify' //ToastContainer es el componente que nos permite mostrar los mensajes
import PatientForm from "./components/PatientForm"
import { PatientList } from "./components/PatientList"
import 'react-toastify/dist/ReactToastify.css'


function App() {


  return (
    <>
        <div className="container mx-auto pt-20">

              <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
                Seguimiento de Pacientes {''}
                <span className="text-indigo-700">Veterinaria</span>
            </h1>


            <div className="mt-12 md:flex">
                <PatientForm/>
                <PatientList/>
            </div>
        </div>

        <ToastContainer
        position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
        />
    </>
  )
}

export default App
