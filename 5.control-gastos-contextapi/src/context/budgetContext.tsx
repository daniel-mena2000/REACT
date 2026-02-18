import { createContext, useReducer, type ReactNode } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"
import type { BudgetAction, BudgetState } from "../reducers/budget-reducer"
//Una cosa es el provider y otra el context como tal
//createContext → crea el “canal” por donde viajarán los datos
//useReducer → maneja la lógica del estado (como ya sabes)
//ReactNode → representa cualquier cosa que React pueda renderizar (componentes, texto, etc.)
type BudgetContextProps = {
    state: BudgetState,
    dispatch: React.Dispatch<BudgetAction>,
    totalGastado: number,
    disponibleBudget: number

}
//Define qué recibe el Provider
//Esto significa:“Mi Provider va a envolver componentes, y esos componentes son children”
type BudgetProviderProps = {
    children: ReactNode
}
//Esto es MUY importante conceptualmente:🧠 React te obliga a poner un valor inicial
//👉 pero ese valor casi nunca se usa, porque el real viene del Provider. puedes colocar: {} as BudgetContextProps que dice: “Confía en mí TypeScript, yo sí voy a pasar este valor después” o tambien se puede pasar null
export const BudgetContext = createContext <BudgetContextProps>({} as BudgetContextProps)

//Provider son los datos que va a tener el context
//Este es tu componente especial, el que:crea el estado lo comparte con toda la app
export const BudgetProvider = ({children}: BudgetProviderProps) => {
//Nada nuevo aquí: state → datos actuales dispatch → forma de modificarlos budgetReducer → reglas initialState → inicio
    const [state, dispatch] = useReducer(budgetReducer, initialState);

const totalGastado = state.expenses.reduce((total, expense) => expense.amount + total, 0)
const disponibleBudget = state.budget - totalGastado

//Esta es la magia real ✨ 👉 Le estás diciendo a React:
//“Oye, cualquier componente que esté dentro de aquí, puede acceder a state y dispatch SIN props”
    return(
        <BudgetContext.Provider value={{state, dispatch, totalGastado, disponibleBudget}}>
            {children}
        </BudgetContext.Provider>
    )
}


// Context no guarda estado.
//El estado lo guarda useReducer. Context solo lo reparte.
