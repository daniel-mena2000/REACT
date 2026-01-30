import { useEffect, useMemo, useReducer } from 'react'
import './App.css'
import { Form } from './components/Form.tsx'
import { activityReducer, initialState } from './reducers/activity-reducers.ts'
import { ActivitiList } from './components/ActivitiList.tsx'
import { CalorieTracker } from './components/CalorieTraker.tsx'

function App() {
// dispatch: Una función que se usa para enviar acciones al reducer y actualizar el estado.
//Pasaremos el dispatch al Form aun que lo ideal seria un estado global, en este caso solo es ejemp.
//Como podemos tener multiples reducers le tenemos que decir el nombre de ese reducer en este caso es: "activityReducer" para poder usar sus funciones y asi manejar su estado que es activities[],
const [state, dispatch] = useReducer(activityReducer, initialState)


useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
},[state.activities])

const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])
function restaurar() {
    dispatch({type: 'restart-app'})
}
  return (
    <>
    <header className='bg-indigo-400 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between'>
            <h1 className='text-center text-lg font-bold uppercase text-white'>Contador de Calorias</h1>
            <button className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10' disabled={!canRestartApp()}
            onClick={() => restaurar()}
            >Reiniciar App</button>
        </div>
    </header>

    <section className='bg-indigo-600 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
        <Form dispatch={dispatch} state={state}/>
        </div>
    </section>

    <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
                <CalorieTracker activities={state.activities}/>
        </div>
    </section>

    <section className='p-10 mx-auto max-w-4xl'>
        <ActivitiList dispatch={dispatch} activities={state.activities}/>
    </section>
    </>
  )
}

export default App
