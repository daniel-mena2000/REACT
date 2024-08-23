import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { Guitar, CartItem, GuitarID } from '../types/types.ts';

export const useCart = () => {
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item : Guitar) {
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if(itemExists >= 0 ) { // existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
//Esta constante será un nuevo objeto de tipo CartItem.
// { ...item }: Esto utiliza el operador de spread para copiar todas las propiedades del objeto item en un nuevo objeto. item es de tipo Guitar, por lo que sus propiedades (id, name, image, description, price, etc.) se copian en newItem.
// quantity: 1: Después de copiar las propiedades de item, se agrega una nueva propiedad quantity con el valor 1 al nuevo objeto. Si item ya tuviera una propiedad quantity (lo cual no ocurre porque item es de tipo Guitar), esta sería sobrescrita por el valor 1.
            const newItem : CartItem = {...item, quantity : 1}
            setCart([...cart, newItem])
        }
    }

    function removeFromCart(id: GuitarID) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function decreaseQuantity(id: GuitarID) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function increaseQuantity(id: GuitarID) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    // State Derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce( (total, item ) => total + (item.quantity * item.price), 0), [cart] )

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}
