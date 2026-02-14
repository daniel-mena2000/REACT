import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export function BudgetForm() {
    const [budget, setBudget] = useState(0)

    const {dispatch} = useBudget() // Ahora podemos llamar el customHook en cualquier componente

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
        },[budget])//Solo cuando budget cambie queremos ejecutar isValid

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('definir presupuesto');

        dispatch({type: 'add-budget', payload: {budget: budget}}) //Como se llama igual puede ser una vez
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                <img
                    src="./controlGasto.png"
                    alt=""
                    className="w-100 mx-auto"
                />

                <div className="flex flex-col space-Y-5">
                    <label htmlFor="budge" className="text-4xl text-sky-700 font-bold text-center">Definir Presupuesto</label>

                <input
                    id="budgeID"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budge"
                    value={budget}
                    onChange={handleChange}
                    />

                </div>

                <input type="submit" value={'Definir Prsupuesto'} className="bg-sky-600 hover:bg-sky-500 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
                />

            </form>
        </>
    )
}
