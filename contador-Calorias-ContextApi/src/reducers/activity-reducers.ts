import { Activity } from "../types"

// Las acciones nos van a ayudar a describir que es lo que esta pasando y que informacion es la que va modificar que parte de nuestro state
// Una accion consta de 2 partes, el type es lo que describe que es lo que esta sucediendo y el payload que es la informacion que modifica o que vamos a agregar a nuestro state, en este caso sera "category,name y calories" es por eso ue le colocamos que sea de tipo Activity
export type ActivityActions =
//newActivity sera nuestro activity de Form una vez pasada la validacion
    {type: "guardar actividad", payload: {newActivity: Activity}} |
    {type: "set-activeId", payload: {id: Activity['id']} } |
    {type: "delete-activity", payload: {id: Activity['id']} } |
//Para resiniciar no es necesario un payload hay que reiniciar activities y activeId
    {type: "restart-app"}


//El state de este reducer sera igual al tipo de Activity
export type ActivityState = {
    activities: Activity[]
    activeId: Activity['id']
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

//Conforme el usuario valla escribiendo nuestro array de "activities" se va air llenando
export const initialState: ActivityState = {
    activities: localStorageActivities(),
//Crearemos un nuevo estado para saber que elemento queremos editar
    activeId: ''
}
//A nuestra funcion le decimos que nuestro "state" vendra de "initialState" y action al type
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions

    ) => {
  //El reducer SIEMPRE debe retornar estado, Un reducer SIEMPRE debe retornar un state,Nunca mutar el estado
    if (action.type === 'guardar actividad') {
        // Este codigo maneja la logica para actualizar el state, todo lo que coloquemos aqui una vez que mandes llamar la accion se ejecutara nuestro if
        console.log("desde guardar actividad");

//Haremos un tipo state que se va a llenar dependiendo de la accion
    let updateActivities: Activity[] = []

    if (state.activeId) {//Si el state de activeId tiene algo significa que estamos editando
//map recorre todas las actividades Para cada item:🔁 Si su id es el mismo que activeId→ lo reemplazas por la actividad nueva llamando a action.payload.newActivity ❌ Si no→ lo dejas igual
        updateActivities = state.activities.map(item => item.id === state.activeId ? action.payload.newActivity : item)
    }else{
//Si no estamos editando seguimos con la logica de agregar, podriamos cortar el retur de abajo y pegarlo todo aqui pero esta es una mejor forma
        updateActivities = [...state.activities, action.payload.newActivity]
        console.log("soy update",updateActivities);

    }
 //Recordar que "state" en este caso hace referencia a activities[]
//Esta copia del primer state es para que no se pierda "activeId" o si tenemos mas estados
//“El primer state es el estado completo (el objeto raíz),y el segundo es el estado interno de la propiedad que estoy modificando.”
        return {
            ...state,
            activities: updateActivities,
            activeId: '' //Es importante reiciniar en cada llamado
        }


    }
//Segunda accion
    if (action.type === 'set-activeId') {
        return{
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activity') {
        return{
            ...state,
            activities: state.activities.filter(item => item.id !== action.payload.id)
        }
    }

    if (action.type === 'restart-app') {
        return{
            activities: [],
            activeId: ''
        }
    }

    return state
}
