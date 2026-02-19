import ExpenseModalForm from "./ExpenseModalForm"
import { useBudget } from "../hooks/useBudget"
export default function Expenses() {

        const {state, dispatch} = useBudget()

  return (
    <>
      <button
        onClick={() => dispatch({type: 'show-modal', payload: {modal: true}})}
        className="fixed bottom-5 right-5 bg-sky-700 text-white p-4 rounded-b-4xl text-4xl cursor-pointer"
      >
        +
      </button>

      <ExpenseModalForm
        open={state.modal}
        onClose={() => dispatch({type: 'show-modal', payload: {modal: false}})}
      />
    </>
  )
}
