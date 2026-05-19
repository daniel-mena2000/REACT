import { useContext } from "react"
import { PaymentContext } from "../contexts/payment-context"

export function Payments() {

//Mandamos llamar useContext y le pasamos el contexto que creamos, y dentro de "context" tenemos nuestros valores
    const context = useContext(PaymentContext)
    return(
        <div className="bg-black/25 border-t-4 border-lime rounded-lg py-6 px-4">
            <h3 className="text-slate-300 mb-2 ">Your Monthly Payments</h3>
            <p className="text-lime text-[40px] font-bold mb-4">${context.result.monthlyPayment.toFixed(2)}</p>
            <hr className="text-slate-300 mb-4"/>
            <h3 className="text-slate-300 mb-2 ">Total you'll repay over the term </h3>
            <p className="text-2xl font-bold">${context.result.totalRepay.toFixed(2)}</p>
        </div>
    )
}
