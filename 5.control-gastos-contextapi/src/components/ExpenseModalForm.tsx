import { categories } from "../db/categories"
import DatePicker from 'react-date-picker'; //"npm i react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css'; // instalamos primero "npm i react-calendar"
import { useEffect, useState } from "react";
import type { DraftExpense } from "../types";
import type { Value } from "react-calendar/dist/shared/types.js";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

type ExpenseModalProps = {
  open: boolean
  onClose: () => void
}

export default function ExpenseModalForm({ open, onClose }: ExpenseModalProps) {

const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
})

const [error, setError] = useState('')
const {state, dispatch} = useBudget()

//Si pasa a false es decir se cierra el modal se reinicia el formulario automáticamente
useEffect(() => {
  if (!open) {
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })
    setError('')
  }
}, [open])


const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
//Verificamos si algun "name" de algun input es amount, para despues a ese convertirlo en numero
    const isAmountField = ['amount'].includes(e.target.name)

    setExpense({
        ...expense,
        [e.target.name]: isAmountField ? Number(e.target.value) : e.target.value
    })
}

const handleChangeDate = (value: Value) => {
    setExpense({
        ...expense,
        date: value
    })
}

const handleSubmit = (e:  React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
//Primero validamos que los inputs no esten vacios, ingresamos a los valores del state para verificar
if (Object.values(expense).includes('')) {
    setError('Todos los campos son obligatorios')
    return;
}

//Si hay algo en editingId significa que estamos editando, recordar que el payload espera un id, pero expense es de tipo "Expense" que no tiene id, espor eso que le indicamos que ese id, lo va a sacar de "editingId" y pasamos el resto como estaba, solomente agregandole un Id
if (state.editingId) {
    dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
}else{
//Si los campos estan llenos y no estan activo editing id, entonces evita el if y entra aqui agregando un nuevo gasto al hacer submit:
    dispatch({type: 'add-expense', payload:{expense: expense}})

}

//Reiniciar state al agregar el gasto

setExpense({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
})
}

//Quiero la info del elemento de "expenses" que tenga el mismo id que "editingId", quiero la primera coincidencia
useEffect(() => {
    if (state.editingId) { //Validamos que editingId tenga algo
        const editingExpense = state.expenses.filter(item => item.id === state.editingId)[0]
        setExpense(editingExpense)
    }

}, [state.editingId]) //En caso de que editingId cambie, queremos ejecutar este codigo



//Si el modal esta cerrado(false) null, si no que abra el modal(true)
  if (!open) return null

  return (
    <form onSubmit={handleSubmit}>

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">


      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-sky-600 py-2">
            {state.editingId ? 'Editar Gasto': 'Nuevo gasto'}
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

         <div className="flex flex-col gap-2 mt-2">
           <label htmlFor="expenseName" className="font-bold">Nombre del gasto: </label>

            <input
            type="text"
            placeholder="Ingresa el nombre del gasto"
            className="bg-slate-100 p-2"
            id="expenseName"
            name="expenseName"
            value={expense.expenseName}
            onChange={handleChange}
            />
        </div>

       <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="amount" className="font-bold">Cantidad: </label>
             <input
            type="number"
            placeholder="Ingresa la cantidad del gasto Ej.300"
            className="bg-slate-100 p-2"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            />
       </div>

        <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="amount" className="font-bold">Categoria: </label>

            <select className="bg-slate-100 p-2" name="category" id="category" value={expense.category} onChange={handleChange}>
                <option value="">-- Seleccione --</option>
                {categories.map(item => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="amount" className="font-bold">Fecha Gasto: </label>
            <DatePicker
                className="bg-sky-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
       </div>

      <input type="submit" className="bg-sky-600 text-white px-4 py-2 rounded-lg w-full font-bold uppercase"
            value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
      />

        <button
        type="button"
          onClick={onClose}
          className="mt-3 text-blue-600 w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
    </form>
  )
}
