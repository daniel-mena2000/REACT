import { useMemo} from "react"
import { CaloriesDisplay } from "./CaloriesDisplay"
import { useActivity } from "../hooks/useActivity"


export function CalorieTracker() {
    const {state} = useActivity()

//Revisamos si la categoria es la 1 que es la de comida es decir subimos de calorias al consumir comida (suma)

    const caloriasConsumidas = useMemo(() => state.activities.reduce((total, item) => item.category === 1 ? total + item.calories : total, 0) , [state.activities])

    const caloriasPerdidas = useMemo(() => state.activities.reduce((total, item) => item.category === 2 ? total + item.calories : total, 0) ,[state.activities])

    const netCalories = useMemo(() => caloriasConsumidas - caloriasPerdidas ,[state.activities])
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
