
//En este caso para pasar el error no usaremos "props" si no un children por eso usamos apertura y cierre en el componente <ErrorMessage>{error}</ErrorMessage>

import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export function ErrorMessage({children}: ErrorMessageProps) {
    return(
        <p className="bg-red-500 mt-2 p-2 text-white font-bold text-sm text-center">
            {children}
        </p>
    )
}
