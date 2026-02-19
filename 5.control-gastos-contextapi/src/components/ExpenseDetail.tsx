import {
    LeadingActions, //Acciones de lado izquierdo
    SwipeableList,
    SwipeableListItem, //Requiere maxSwipe={30} que son los pixeles donde dara la accion
    SwipeAction, //Dentro sera lo que se va a disparar en caso de que llegue a 30pixeles, requiere un onclick
    TrailingActions //Acciones del lado derecho
} from 'react-swipeable-list' //npm install react-swipeable-list esta libreria depende de: npm install prop-types
import type { Expense } from "../types"
import { formatDate } from "../helpers"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../db/categories"
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from '../hooks/useBudget'


type ExpenseDetailProps = {
    expense: Expense
}

export function ExpenseDetail({expense}: ExpenseDetailProps) {

    const {dispatch} = useBudget()


const categoryInfo = categories.filter(item => item.id === expense.category)[0]

const leadingActions = () => {
  return(
      <LeadingActions>
        <SwipeAction onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}>
        Actualizar
        </SwipeAction>
      </LeadingActions>
  )
}
const trailingActions = () => {
  return(
    <TrailingActions>
        <SwipeAction onClick={() => dispatch({type: 'remove-expense', payload:{id: expense.id}})}>
        Eliminar
        </SwipeAction>
    </TrailingActions>
  )
}
    return(

        <SwipeableList>
            <SwipeableListItem maxSwipe={30} leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
            <div>
                <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono tipo de gasto"
                className="w-20"
                />
            </div>

            <div className="flex-1 space-y-2">
                <p className="text.sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
            </div>

            <AmountDisplay
            amount={expense.amount}
            />
        </div>
        </SwipeableListItem>
        </SwipeableList>
    )
}
