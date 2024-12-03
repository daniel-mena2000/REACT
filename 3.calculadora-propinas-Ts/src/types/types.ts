export type MenuItem = {
    id: number,
    name: string,
    price: number
}

// Como para la orden necesitamos lo mismo que MenuItem pero con cantidad por eso lo extendemos y le agregamos la nueva propiedad
export type OrderItem = MenuItem &{
    quantity: number
}
