import {v4 as uuidv4} from 'uuid' // npm i uuid y npm i --save-dev @types/uuid
import type { DraftExpense, Expense } from "../types"

export type BudgetAction =
{type: 'add-budget', payload: {budget: number}} |
{type: 'show-modal', payload: {modal: boolean}} |
{type: 'add-expense', payload: {expense: DraftExpense}} |//El "expense" que se agregue no tendra el "id" normal de "db", este sera generado cuando se agregue al estado
{type: 'remove-expense', payload: {id: Expense['id']}} |
{type: 'get-expense-by-id', payload: {id: Expense['id']}}  |
{type: 'update-expense', payload: {expense: Expense}} //Cuando estemos actualizando necesitamos el state completo


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: ''
}

//Cuando se cree un nuevo Gasto queremos que se genere un ID para cada uno y que ya no sea de tipo "DraftExpense" si no "Expense" que es el que pide ID, en este caso le tenemos que pasar la info, de tipo DraftExpense, que es como se genera en "ExpenseModalForm" pero al llamar la funcion este tiene que retornar de tipo "Expense". hacemos copia de lo que nos pasen y le agregamos el ID en cada llamado
const createExpense = (item: DraftExpense) :  Expense => {
    return {
        ...item,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetAction
) => {
    if (action.type === 'add-budget') {
        return{
            ...state,
            budget: action.payload.budget
        }
    }

//Si modal es true → lo abre y mantiene el editingId
//Si modal es false → lo cierra y limpia editingId
    if (action.type === 'show-modal') {
        return{
            ...state,
            modal: action.payload.modal,
            editingId: action.payload.modal ? state.editingId : ''
        }
    }

    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense)
        return{
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }
    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(item => item.id !== action.payload.id)
        }
    }

    if (action.type === 'get-expense-by-id') {
        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
//Para actualizar el "id" que nos pasen en el payload, tiene que estar en el state(expenses), cuando detecte que es igual entonces vamos a reecribir en ese gasto, y si hay mas gastos esos los pasamos como estaban para no perder referencia
//✅ Si el ID coincide → reemplázalo con el gasto actualizado: action.payload.expense
//❌ Si no coincide → déjalo como está: item
    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(item => item.id === action.payload.expense.id ? action.payload.expense : item),
            modal: false,
            editingId: ''
        }
    }
    return state
}
