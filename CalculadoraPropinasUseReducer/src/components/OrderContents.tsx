import { MenuItem, OrderItem } from "../types/types.ts"
import { formatCurrency } from "../helpers/index.ts"
import { OrderActions } from "../reducers/orderReducer.tsx"

type OrderContentProps = {
    order: OrderItem[],
    dispatch:  React.Dispatch<OrderActions>
}

export function OrderContens({order,dispatch} : OrderContentProps) {
    return(
        <>
            <h2 className="font-black text-4xl">Consumo</h2>

            <div className="space-y-3 mt-5">
            {
                <>
                <p className="text-center text-2xl">Tu orden <i className='bx bxs-edit-alt'></i></p>
                {order.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-t pt-5 last-of-type:border-b">
                        <div>
                        <p className="text-lg">{item.name}</p>
                        <p><i className='bx bx-subdirectory-right' ></i>{formatCurrency(item.price * item.quantity)}</p>
                        <p className="font-bold">Cantidad: {item.quantity} </p>

                        </div>
                        <button className="bg-red-600 h-7 w-7 rounded-full text-white font-black" onClick={()=> dispatch({type: 'removeItem', payload: {id: item.id}})}><i className='bx bx-trash'></i></button>
                    </div>
                ))}
                </>

}

            </div>
        </>
    )
}
