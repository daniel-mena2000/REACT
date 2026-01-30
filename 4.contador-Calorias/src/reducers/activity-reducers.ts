import { Activity } from "../types"


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
        console.log("desde guardar actividad");

//Haremos un tipo state que se va a llenar dependiendo de la accion
    let updateActivities: Activity[] = []

    if (state.activeId) {//Si el state de activeId tiene algo significa que estamos editando
        updateActivities = state.activities.map(item => item.id === state.activeId ? action.payload.newActivity : item)
    }else{

        updateActivities = [...state.activities, action.payload.newActivity]
        console.log("soy update",updateActivities);

    }
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
