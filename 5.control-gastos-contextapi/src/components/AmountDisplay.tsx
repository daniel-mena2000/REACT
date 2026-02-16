import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string //label opcional, en el compoente en caso de que haya algun label que lo muestre
    amount: number
}

export function AmountDisplay({label, amount}: AmountDisplayProps) {
    return(
       <p className="text-2xl text-sky-700 font-bold">

        {label && `${label}: `}

        <span className="font-black text-black">{formatCurrency(amount)}</span>
       </p>
    )
}
