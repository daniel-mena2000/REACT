import {v4 as uuidv4} from 'uuid' // npm i uuid y npm i --save-dev @types/uuid
import type { DraftExpense, Expense } from "../types"

export type BudgetAction =
{type: 'add-budget', payload: {budget: number}} |
{type: 'show-modal', payload: {modal: boolean}} |
{type: 'add-expense', payload: {expense: DraftExpense}} //El "expense" que se agregue no tendra el "id" normal de "db", este sera generado cuando se agregue al estado


export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: []
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
    if (action.type === 'show-modal') {
        return{
            ...state,
            modal: action.payload.modal
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
    return state
}
