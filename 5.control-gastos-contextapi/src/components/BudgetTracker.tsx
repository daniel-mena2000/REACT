import { CircularProgressbar, buildStyles } from "react-circular-progressbar" //npm i react-circular-progressbar
import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"
import "react-circular-progressbar/dist/styles.css"

export function BudgetTracker() {

    const {state, dispatch, totalGastado, disponibleBudget} = useBudget()

    const percentage = Number(((totalGastado / state.budget) * 100).toFixed(1))
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#FF2056' :'#1C69A8' ,
                        trailColor: '#DFF2FE',
                        textSize: 10,
                        textColor: percentage === 100 ? '#FF2056' :'#1C69A8'
                    })}
                    text={`${percentage}% Gastado`}
                />
            </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button type="button" className="bg-red-400 w-full p-2 text-white uppercase font-bold rounded-lg"
             onClick={() => dispatch({type: 'reset-app'})}>
                    Resetear App
            </button>

              <AmountDisplay label={'Presupuesto'} amount={state.budget}/>

            <AmountDisplay label={'Disponible'} amount={disponibleBudget}/>

            <AmountDisplay label={'Gastado'} amount={totalGastado}/>


        </div>
        </div>
    )
}
