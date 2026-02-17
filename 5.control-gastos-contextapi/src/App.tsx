import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { BudgetTracker } from "./components/BudgetTracker"
import { ExpenseList } from "./components/ExpenseList"
import Expenses from "./components/Expenses"

function App() {

const {state} = useBudget() //Mandamos llamar el hook
//Verificamos que el stado de "budget" no este vacio
const isValidBudget = state.budget > 0

  return (
    <>
        <header className="bg-sky-700 py-8 max-h-72">
            <h1 className="uppercase text-center font-black text-4xl text-white">
                Planificador de Gastos
            </h1>
        </header>

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
            {isValidBudget ? <BudgetTracker />  :  <BudgetForm />}
        </div>

        {isValidBudget && (
        <main className="max-w-3xl mx-auto p-10">
             <ExpenseList/>
            <Expenses />

        </main>

        )}
    </>
  )
}

export default App
