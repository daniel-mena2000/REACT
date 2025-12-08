// Recordar que aqui van nuestras funciones
import { useState } from "react";
import { MenuItem, OrderItem } from "../types/types.ts";

export function useOrder() {
// Haremos uso de "Generic" <tipoDeDato>, es decir le indicamos que el array tiene que tener las propiedades de OrderItem
    const [order, setOrder] = useState<OrderItem[]>([]);
    // state para la propina
    const [tip, setTip] = useState(0);

    function addItem(item : MenuItem) {

        const itemExist = order.find(orderItem => orderItem.id === item.id);
        if (itemExist) {
// Ahora como "itemExist" solo nos dice si el elemento existe, tenemos que ver que elemento es el repetido para ir aumentando la cantidad para eso usaremos un map, recordar que esto para crear un nuevo array y no alterar el principal

// Entonces si se cumple y entra en el if usaremos (?:) para condicionar, map ira recorriendo cada itemOrder, ejemplo vera   { id: 1, quantity: 1 },{ id: 2, quantity: 3 }, { id: 3, quantity: 2 } y por ejemplo revisara si esta el ID:2, revisara si 1 === 2 en este caso pues no es 2, entonces ahi es donde entra en ":" y devuelve y agrega el elemento como esta al nuevo array "updateOrder", luego 2 === 2 ahi si entonces le suma 1 a la cantidad, lo agrega al array , luego 2===3, no entonces lo deja como esta, es importante entender que map ira contruyendo el nuevo array en base a esto y a diferencia de findIndex, map recorre todo el array indendientemente que ya alla encontrado la coincidencia, findIndex al encontrar la primera coincidencia se detiene y devuleve 0 o -1.
            const updateOrder = order.map(itemOrder => itemOrder.id === item.id ?
                 {...itemOrder, quantity: itemOrder.quantity + 1} : itemOrder);
// Ahora si ya podemos setear
                setOrder(updateOrder)
        }else{
// No podemos pasar la copia de "order" que tiene el type:"ordenItem" a "Item" que tiene el type:"MenuItem" es por eso que hacemos una copia de "item" que se va a llamar "newItem" pero ahora con la cantidad.
// Si nos colocamos sobre "newItem" podemos ver las propiedades del Type "orderItem" pero no es un type de orderItem, ten en cuenta eso, lo puedes dejar asi ya que el Generic ya lo esta tomando en el state, pero aun asi le puedes poner que sea de tipo "orderItem"
        const newItem : OrderItem = {...item, quantity: 1}
        setOrder([...order, newItem])
        }

    }

    const removeItem = (id: MenuItem['id']) =>{
        setOrder(order.filter(item => item.id !== id))
    }

    const placeOrder = () => {
        setOrder([]);
        setTip(0);
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }

}
