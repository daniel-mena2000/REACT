import { useMemo, useReducer } from "react"
import { Activity } from "../types"
import { CaloriesDisplay } from "./CaloriesDisplay"
type CalorieTrackerProps = {
    activities: Activity[]
}

export function CalorieTracker({activities}: CalorieTrackerProps) {
//Revisamos si la categoria es la 1 que es la de comida es decir subimos de calorias al consumir comida (suma)

    const caloriasConsumidas = useMemo(() => activities.reduce((total, item) => item.category === 1 ? total + item.calories : total, 0) , [activities])

    const caloriasPerdidas = useMemo(() => activities.reduce((total, item) => item.category === 2 ? total + item.calories : total, 0) ,[activities])

    const netCalories = useMemo(() => caloriasConsumidas - caloriasPerdidas ,[activities])
    return(
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloriesDisplay calories={caloriasConsumidas} text='Consumidas'/>

                <CaloriesDisplay calories={caloriasPerdidas} text="Ejercicio"/>

                <CaloriesDisplay calories={netCalories} text="Diferencia"/>

            </div>

        </>
    )
}
