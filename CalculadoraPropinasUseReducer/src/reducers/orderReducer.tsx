import { MenuItem } from "../types/types"
import { OrderItem } from "../types/types"



export type OrderActions =
{type: 'addItem', payload: {item: MenuItem}} |
{type: 'removeItem', payload: {id: MenuItem['id']}} |
{type: 'placeOrder'}|
{type: 'add-tip', payload: {value: number}}

export type OrderState = {
    order: OrderItem[],
    tip: number
}

export const initialState: OrderState = {
    order: [],
    tip: 0
}


export const orderReducer = (
     state: OrderState = initialState,
     action: OrderActions
) => {
    if (action.type === 'addItem') {

        const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id);
        if (itemExist) {

            const updateOrder = state.order.map(itemOrder => itemOrder.id === action.payload.item.id ?
                 {...itemOrder, quantity: itemOrder.quantity + 1} : itemOrder);
              return{
            ...state,
            order: updateOrder
        }
        }else{

        const newItem : OrderItem = {...action.payload.item, quantity: 1}
            return{
                ...state,
                order: [...state.order, newItem]
            }
        }
    }
        if (action.type === 'removeItem') {

            return{
                ...state,
                order: state.order.filter(item => item.id !== action.payload.id)
            }
        }

        if (action.type === 'placeOrder') {
            return{
                order: [],
                tip: 0
            }
        }

        if (action.type === 'add-tip') {
            const tip = action.payload.value

            return{
            ...state,
            tip
        }
        }

    return state

}
