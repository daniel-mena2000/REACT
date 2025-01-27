import { Activity } from "../types"

// Las acciones nos van a ayudar a describir que es lo que esta pasando y que informacion es la que va modificar que parte de nuestro state
// Una accion consta de 2 partes, el type que es la descripcion y el payload que es la informacion que modifica o que vamos a agregar a nuestro state
export type ActivityActions = {
    type: "guardar actividad", payload: {newActivity: Activity}
}

type ActivityState = {
    activities: Activity[]
}

export const initialState: ActivityState = {
    activities: []
}

export const activityReducer = (state: ActivityState = initialState, action: ActivityActions) => {
    if (action.type === 'guardar actividad') {
        // Este codigo maneja la logica para actualizar el state
        console.log("desde");

    }
}
