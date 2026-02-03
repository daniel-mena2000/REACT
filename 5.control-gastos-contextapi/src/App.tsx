import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"





function App() {

const {state, dispatch} = useBudget() //Mandamos llamar el hook

console.log(state);

  return (
    <>
        <header className="bg-cyan-700 py-8 max-h-72">
            <h1 className="uppercase text-center font-black text-4xl text-white">
                Planificador de Gastos
            </h1>
        </header>

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
            <BudgetForm />
        </div>


    </>
  )
}

export default App
