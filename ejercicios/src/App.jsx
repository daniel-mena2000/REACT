import { useState, useEffect } from 'react'
import { Post } from './post.jsx'
import { ModuloIconos } from './ModulosIconos.jsx';
import { PadreArrays } from './Padre.jsx';
import { ArraysReact } from './ArraysReact.jsx';
import { TaskList } from './TaskList.jsx';
import { TaskForm } from './TaskForm.jsx';
import { taskData } from "./data.js";


import './App.css'


function App() {

  const user = [
    {id:1, nombre: "Jose Daniel", img: "https://robohash.org/user1"},
    {id:2, nombre: "Daniela H", img: "https://robohash.org/user2"},
    {id:3, nombre: "Carlos J", img: "https://robohash.org/user3"},
    {id:4, nombre: "Mariana M", img: "https://robohash.org/user9"},
  ]

  const [task, setTask] = useState([]);
    
  useEffect(() =>{
      setTask(taskData)
  },[]);

  function createTask(newTask){
//Copiamos nuestro estado, y le asigamos las nuevas tareas que vaya recibiendo lña funcion
    setTask([...task, {
      title: newTask,
      id: task.length,
      description: "nueva tarea"
    }])
  }

  return (
    <>
    <h2>Petición a una API</h2>
      <Post />
<hr />

    <h2>Modulos de Terceros</h2>
   <ModuloIconos />

<hr />

    <h2>Arrays en React</h2>

<PadreArrays>
    {user.map(item => {
      return(
        <ArraysReact key={item.id}  nombre={item.nombre} imagenURL={item.img}/>
      )
    })}
</PadreArrays>

<hr />
<TaskForm createTask={createTask}/>
<TaskList task={task}/>
     

    </>
  )
}

export default App
