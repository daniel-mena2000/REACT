import { Dispatch, useState } from "react"
import { categorias } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducers"
import { v4 as uuidv4} from "uuid"

//Traeremos Dispatch de React y le vamos a pasar las acciones LLamadas "ActivityActions" para que el dispatch que se esta creando en el useReducer que viene desde "ActivityReducer" tenga la informacion de que acciones tiene el reducer que lo ha creado
type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export function Form({dispatch}: FormProps) {
// Podriamos crear "states" separados para: categoria, actividad y calorias pero estos estan relacionados y dependen uno del otro asi que solo haremos uno para todos.
const [activity, setActivity] = useState<Activity>(initialState)

// Como tipo al (e) le pasaremos el tipo que valla a utilizar cada elemento en este caso es un select y un input
// Podemos importar "ChangeEvent quitar ".React
//Podriamos hacer una funcion para cada input y el select, asignando el estado con el valor del input, pero lo englobaremos en una sola funcion, donde es importante que el nombre del state se llame igual que el "id" de los elementos a seleccionar, asi se asignaran automaticamente el nombre del "id" al nombre del estado a cambiar se usa [] para que pueda ser dinamico.
const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
//Quiero que category y calories sean de tipo numero ya que en el state son string. Crearemos una variable que comprobara si donde yo estoy escribiendo si es categoria o calorias para despues convertirlo a numero si escribimos en category o calories dara "true" si escribimos en otro campo que no sean estos 2 dara false
//Veremos si el "id" por ejemplo "calories" esta dentro del array "['category', 'calories']" y condicionaremos en este caso, si si esta pues lo convertimos a numero
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
//Le pasamos la informacion al payload
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
