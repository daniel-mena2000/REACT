import { useReducer } from 'react'
import './App.css'
import { Form } from './components/Form.tsx'
import { activityReducer, initialState } from './reducers/activity-reducers.ts'
import { ActivitiList } from './components/ActivitiList.tsx'
function App() {
// dispatch: Una función que se usa para enviar acciones al reducer y actualizar el estado.
//Pasaremos el dispatch al Form aun que lo ideal seria un estado global, en este caso solo es ejemp.
//Como podemos tener multiples reducers le tenemos que decir el nombre de ese reducer en este caso es: "activityReducer" para poder usar sus funciones y asi manejar su estado que es activities[],
const [state, dispatch] = useReducer(activityReducer, initialState)
  return (
    <>
    <header className='bg-indigo-400 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between'>
            <h1 className='text-center text-lg font-bold uppercase text-white'>Contador de Calorias</h1>
        </div>
    </header>

    <section className='bg-indigo-600 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
        <Form dispatch={dispatch}/>
        </div>
    </section>

    <section className='p-10 mx-auto max-w-4xl'>
        <ActivitiList activities={state.activities}/>
    </section>
    </>
  )
}

export default App
