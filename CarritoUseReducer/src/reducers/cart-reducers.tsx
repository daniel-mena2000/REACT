import { db } from "../data/db"
import { Guitar } from "../types"
import { CartItem } from "../types"



export type CartActions =
{type: 'addToCart', payload: {item: Guitar}} |
{type: 'removeFromCart', payload: {id: Guitar['id']}} |
{type: 'decreaseQuantity', payload: {id: Guitar['id']}} |
{type: 'increaseQuantity', payload: {id: Guitar['id']}} |
{type: 'clearCart'}


export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

export const initialState: CartState = {
//Estos son los estados que ocupa el carrito
    data: db,
    cart: initialCart()
}
const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReduce = (
    state: CartState = initialState,
    action: CartActions
) => {
    if (action.type === 'addToCart') {
//Cambiamos el findIndex por find, este nos devuelve el elemento item ya no un numero
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)

        let updatedCart: CartItem[] = []
        if(itemExists) { // existe en el carrito
           updatedCart = state.cart.map(item => {
//If para saber si el elemento que se presiono ya esta en cart
            if (item.id === action.payload.item.id) {
                if (item.quantity < MAX_ITEMS) {
                    return {...item, quantity: item.quantity + 1}
                }else{
                    return item //Si ya llego al limite se detiene y mantenemos lo que tenemos
                }
            }else{
                return item //Este es el return del item que no se esta incrementando y no queremos perder referencia
            }
           })

        } else {
            const newItem : CartItem = {...action.payload.item, quantity : 1}//Agregamos cantidad a item
            updatedCart = [...state.cart, newItem] // Aqui es como setear
        }
        return{
            ...state,
            cart: updatedCart
        }
    }
     if (action.type === 'removeFromCart') {
        const updateCart = state.cart.filter(item => item.id !== action.payload.id)
        return{
            ...state,
            cart: updateCart
        }
    }

     if (action.type === 'decreaseQuantity') {
         const updatedCart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        return{
            ...state,
            cart: updatedCart
        }
    }

     if (action.type === 'increaseQuantity') {
            const updatedCart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })

        return{
            ...state,
            cart: updatedCart
        }
    }

     if (action.type === 'clearCart') {
        return{
            ...state,
            cart: []
        }
    }

    return state
}
