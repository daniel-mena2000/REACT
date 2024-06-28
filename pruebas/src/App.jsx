import { useEffect, useState } from 'react'
import './App.css';
import { taskDataP } from './data.js';
import { ListTask } from './components/ListTask.jsx';
import { Form } from './components/Form.jsx';
function App() {

  const [tasks, setTask] = useState([]);

  useEffect(()=>{
    setTask(taskDataP);
  },[])

function agregarTareas(tareas){
  setTask([...tasks, {
      title: tareas.title,
      id: tasks.length,
      description: tareas.description
  }])
}

function eliminarTarea(tareaDeletId) {
    setTask(tasks.filter(item => item.id !== tareaDeletId))
}
return(
  <>
  <h1>Lista de tareas</h1>
  <Form agregarTareas={agregarTareas}/>
  <ListTask tasks={tasks} eliminarTarea={eliminarTarea}/>
  </>
)

}



export default App
