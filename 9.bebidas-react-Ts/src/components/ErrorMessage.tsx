
type ErrorMessageType = {
    children: React.ReactNode
}

export function ErrorMessage({children}: ErrorMessageType) {
    return(
        <h2>{children}</h2>
    )
}
