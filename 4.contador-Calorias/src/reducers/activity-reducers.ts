import { Activity } from "../types"

// Las acciones nos van a ayudar a describir que es lo que esta pasando y que informacion es la que va modificar que parte de nuestro state
// Una accion consta de 2 partes, el type es lo que describe que es lo que esta sucediendo y el payload que es la informacion que modifica o que vamos a agregar a nuestro state, en este caso sera "category,name y calories" es por eso ue le colocamos que sea de tipo Activity
export type ActivityActions = {
    type: "guardar actividad", payload: {newActivity: Activity} //newActivity sera nuestro activity de Form una vez pasada la validacion
}

//El state de este reducer sera igual al tipo de Activity
export type ActivityState = {
    activities: Activity[]
}

//Conforme el usuario valla escribiendo nuestro array de "activities" se va air llenando
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
        //console.log(action.payload.newActivity); Ejemplo de lo que apunta payload
        return {
 //Recordar que "state" en este caso hace referencia a activities[]
//Esta copia es por si tienes mas propiedades en el state no se pierdan, en este caso es "activities"
//“El primer state es el estado completo (el objeto raíz),y el segundo es el estado interno de la propiedad que estoy modificando.”
            ...state,
            activities:[...state.activities, action.payload.newActivity]
        }


    }
    return state
}
