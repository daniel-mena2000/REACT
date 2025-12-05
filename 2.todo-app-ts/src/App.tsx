import Form from './components/Form'
import './App.css'
import { infoList } from './data/lista'
import { useEffect, useState } from 'react'
import CartList from './components/CardList'
import type { List } from './types'
import type { ListBasic } from './types'
function App() {

    const [task, setTask] = useState<List[]>([])

    useEffect(() => {
        setTask(infoList)
    },[])

    function agregarTarea(info: ListBasic) {
        setTask([...task, {
            nombre: info.nombre,
            descripcion: info.descripcion,
            id: task.length + 1
    }])
    }
    function eliminar(id: List['id']) {
        setTask(task.filter(item => item.id !== id))
    }
  return (
    <>
        <h1>Lista de tareas</h1>

    <div className="container">
      <Form agregarTarea={agregarTarea} />
      <CartList task={task} eliminar={eliminar}/>
    </div>
    </>
  )
}

export default App
