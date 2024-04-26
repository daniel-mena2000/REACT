import { useEffect, useState } from 'react'
import './App.css'
import { ListaTareas } from './Lista.jsx';
import { FormTareas } from './Form.jsx';
import { taskDataP } from "./data"




function App() {
  const [tarea, setTarea] = useState([])

useEffect(()=>{
    setTarea(taskDataP)
},[])

function AgregarTarea(nuevaTarea){
    setTarea([...tarea, {
      title: nuevaTarea,
      id: tarea.length,
      description: "Descripcion de la tarea"
    }])
}
  return(
    <>
      <h1>Lista de tareas</h1>
      <FormTareas info={AgregarTarea}/>
      <ListaTareas rederLista={tarea}/>

    </>
  )

}


export default App
