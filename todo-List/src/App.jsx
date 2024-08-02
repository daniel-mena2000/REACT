import { useEffect, useState } from 'react'
import { taskDataP } from './data/data.js'
import './App.css'
import { List } from './components/List.jsx';
import { Form } from './components/Form.jsx';
function App() {

  const [task, setTask] = useState([]);

  useEffect(()=>{
    setTask(taskDataP)
  },[])

  function agregarTarea(tareas){
    setTask([...task, {
        title: tareas.title,
        id: task.length,
        description: tareas.description
      }
    ])
  }

  function eliminarTareas(id) {
      setTask(task.filter(item => item.id !== id))
  }

  return (
    <>
      <h1>Lista de Tareas</h1>
      <Form agregar={agregarTarea}/>
      <List task={task} eliminar={eliminarTareas}/>


    </>
  )
}

export default App
