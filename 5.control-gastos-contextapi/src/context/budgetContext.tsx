import { createContext, useReducer, type ReactNode } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"
import type { BudgetAction, BudgetState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState,
    dispatch: React.Dispatch<BudgetAction>,
    totalGastado: number,
    disponibleBudget: number

}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext <BudgetContextProps>({} as BudgetContextProps)


export const BudgetProvider = ({children}: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

const totalGastado = state.expenses.reduce((total, expense) => expense.amount + total, 0)
const disponibleBudget = state.budget - totalGastado

    return(
        <BudgetContext.Provider value={{state, dispatch, totalGastado, disponibleBudget}}>
            {children}
        </BudgetContext.Provider>
    )
}



