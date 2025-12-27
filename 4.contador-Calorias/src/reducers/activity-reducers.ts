import { Activity } from "../types"

// Las acciones nos van a ayudar a describir que es lo que esta pasando y que informacion es la que va modificar que parte de nuestro state
// Una accion consta de 2 partes, el type es lo que describe que es lo que esta sucediendo y el payload que es la informacion que modifica o que vamos a agregar a nuestro state
export type ActivityActions = {
    type: "guardar actividad",
    payload: {newActivity: Activity} //newActivity sera nuestro activity de Form una vez pasada la validacion
}

type ActivityState = {
    activities: Activity[]
}

export const initialState: ActivityState = {
    activities: []
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

    }
    return state
}
