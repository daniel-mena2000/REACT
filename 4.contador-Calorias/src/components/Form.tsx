import { Dispatch, useEffect, useState } from "react"
import { categorias } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducers"
import { v4 as uuidv4} from "uuid"
import { ActivityState } from "../reducers/activity-reducers"
//Traeremos Dispatch de React y le vamos a pasar las acciones LLamadas "ActivityActions" para que el dispatch que se esta creando en el useReducer que viene desde "ActivityReducer" tenga la informacion de que acciones tiene el reducer que lo ha creado
type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export function Form({dispatch,state}: FormProps) {

const [activity, setActivity] = useState<Activity>(initialState)

//Usaremos un efecto para saber en que momento nuestro state tiene un activeId y setearemos el formulario
useEffect(()=>{
    if (state.activeId) {
        console.log('Ya hay algo en activeID');
        const selectActivity = state.activities.filter(item => item.id === state.activeId)[0]
        setActivity(selectActivity)
    }
},[state.activeId])

const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {

const isNumberField = ['category', 'calories'].includes(e.target.id) //ejemplo: ['category', 'calories'].includes('calories') // true
    setActivity({
        ...activity,
        [e.target.id]: isNumberField ? +e.target.value : e.target.value //Ejemplo: (id:name: value:comida)
    })
}

//Funcion para activar el boton de "guardar" se verifica que no se rellene con espacion en blanco o se quede en 0, le pasamos esta funcion al "disabled" del boton
function isValidActivity() {
    const {name, calories} = activity
    return name.trim() !== '' && calories > 0
}

//Queremos el "dispatch" cuando se active: handleSubmit
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
//Le pasamos la informacion al payload que es el estado de activity
    dispatch({type: 'guardar actividad', payload: {newActivity: activity}})

//REINICIAMOS FORMULARIO y asignamos nuevo ID para cada elemento
    setActivity({
        ...initialState,
        id: uuidv4()
    })
}


    return(
        <>
        <form
        className="space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
        >
            <label htmlFor="category">Categoria</label>
            {/* Le asignaremos el "value" lo que valga el valor de category del estado el valor en este caso 1 sera comida y 2 ejercicio, dejaremos 1 por defecto*/}
            <select id="category" className="border border-slate-300 p-2 rounde-lg w-full bg-white"
             value={activity.category}
            //  Usaremos un onchange para detectar cambios para ir cambiando el value del los inputs
            // Verificar el tipo de (e):   onChange={e =>} colocarse sobre "e" y ver el tipo que nos da VSC
            onChange={handleChange}
             >
            {categorias.map(item => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
            </select>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold bg-white">Actividad:</label>
                <input
                id="name" type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
        // Asigname el "value" al valor del estado
                value={activity.name}
                onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold bg-white">Calorias:</label>
                <input id="calories" type="number"
                 className="border border-slate-300 p-2 rounded-lg"
                 placeholder="calorias. Ej.300 o 500"
                 value={activity.calories}
                 onChange={handleChange}

                 />


            </div>
            <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'} disabled={!isValidActivity()}/>
        </form>
        </>
    )
}
