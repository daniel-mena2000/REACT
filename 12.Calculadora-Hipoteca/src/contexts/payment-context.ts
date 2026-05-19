import { createContext } from "react"

//Estos son los tipos de los datos que vamos a guardar
export type Results = {
    monthlyPayment: number
    totalRepay: number
}

export type PaymentContextType = {
    result: Results
    setResults: (result: Results) => void
}

//Este contexto va a tener un estado: "result" y una funcion "setResults" que me permite actualizar ese estado
export const PaymentContext = createContext<PaymentContextType>({
    result: {
        monthlyPayment: 0,
        totalRepay: 0
    },
    setResults: () => {}
})
