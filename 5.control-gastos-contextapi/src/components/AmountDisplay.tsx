import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label: string
    amount: number
}

export function AmountDisplay({label, amount}: AmountDisplayProps) {
    return(
       <p className="text-2xl text-sky-700 font-bold">
        {label} : {''}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
       </p>
    )
}
