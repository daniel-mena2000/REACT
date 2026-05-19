//Este provider va a devolver el contexto que acabamos de crear
import { PaymentContext, type Results } from "./payment-context"
import { useState } from "react"

type Props = {
    children: React.ReactNode
}

export const PaymentContextProvider = ({children}: Props) => {
//Creamos el state para guardar la info, y se la pasamos al provider atra vez de "value" que es lo que espera PaymentContext
    const [result, setResults] = useState<Results>({
        totalRepay: 0,
        monthlyPayment: 0
    })
//Este "PaymentContext" internamente tiene "Provider"
return(
    <PaymentContext.Provider value={{result, setResults}}>
        {children}
     </PaymentContext.Provider>
)
}
//Ahora solo pasamos el "PaymentContext.Provider" a englobar toda nuestra App para que los componentes tengas acceso a este estado
