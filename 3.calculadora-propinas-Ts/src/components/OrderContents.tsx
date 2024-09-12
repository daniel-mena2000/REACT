import { OrderItem } from "../types/types.ts"
import { formatCurrency } from "../helpers/index.ts"
import { MdDelete } from "react-icons/md";

type OrderContentProps = {
    order: OrderItem[];
}

export function OrderContens({order} : OrderContentProps) {
    return(
        <>
            <h2 className="font-black text-4xl">Consumo</h2>

            <div className="space-y-3 mt-5">
            {order.length === 0 ?
            <p className="text-center text-2xl">La orden esta vacia <i className='bx bx-sad'></i></p>
            :(
                <>
                <p className="text-center text-2xl">Tu orden <i className='bx bxs-edit-alt'></i></p>
                {order.map(item => (
                    <div key={item.id} className="flex justify-between items-center border-t pt-5 last-of-type:border-b">
                        <div>
                        <p className="text-lg">{item.name}</p>

                        <p><i className='bx bx-subdirectory-right' ></i>{formatCurrency(item.price * item.quantity)}</p>

                        <p className="font-bold">Cantidad: {item.quantity} </p>
                        </div>
                        <button className="bg-red-600 h-7 w-7 rounded-full text-white font-black"><i className='bx bx-trash' ></i></button>
                    </div>
                ))}
                </>
            )
}

            </div>
        </>
    )
}
