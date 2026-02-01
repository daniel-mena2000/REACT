import { useMemo } from "react"
import { OrderItem } from "../types/types"
import { formatCurrency } from "../helpers"
import { OrderActions } from "../reducers/orderReducer"
type OrderTotalsProps = {
    order: OrderItem[];
    tip: number;
    dispatch:  React.Dispatch<OrderActions>

}
export default function OrderTotals({order,tip, dispatch} : OrderTotalsProps) {
// Recordar que useMemo ejecuta el codigo cuando ciertas dependencias cambien en este caso cuando cambie "order"
    const subTotalAmount = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price),0 ),[order])
// Este codigo de propinas queremos que se ejecuten cuando 2 cosas cambien "tip y order", sera cuando cambie propinas es decir si colocamos 10% pero mejor cambiamos a 20%, y cuando el contenido de nuestra orden cambie
    const tipAmount = useMemo(() =>subTotalAmount * tip, [tip, order])
// En vez de usar useMemo tambien esta useCallback aun que la sintaxis es mas larga
// Seria asi: const totalAmount = useCallback(()=> subTotalAmount() + tipAmount(),[tip, order])
// Pero igualmente subTotalAmount y tipAmount tienen que estan con useCallback y mandarlas a llamar igual  subTotalAmount()
    const totalAmount = useMemo(()=> subTotalAmount + tipAmount,[tip, order])
  return (
    <>
     <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina:</h2>
        <p>
            Subtotal a pagar:
            <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
        </p>
        <p>
            Propina:
            <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>

        <p>
            Total a pagar:
            <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
    </div>

    <button className="w-full bg-red-400 p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
// Este boton estara desactivado si el total es 0, y la opcidad en 10 hasta que se active
    disabled={totalAmount === 0}
    onClick={() => dispatch({type: 'placeOrder'})}
    >
        Guardar Orden
    </button>
    </>

  )
}
