import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"


export function ExpenseList() {

    const {state} = useBudget()

    const isEmpty = state.expenses.length === 0
    return(
        <div className="mt-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> :

            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                {state.expenses.map(item => (
                    < ExpenseDetail
                    key={item.id}
                    expense={item}
                    />
                ) )}
            </>
            }
        </div>
    )
}
