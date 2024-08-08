

export function TotalCarrito({total}) {
    return(
        <>
        <div className="carrito-total">
            <div className="fila">
                <strong>Tu total</strong>
                <span className="carrito-precio-total">
                    ${total()}
                </span>
            </div>

            <button className="btn-pagar">
                pagar <i className="fa-solid fa-bag-shopping"></i>
            </button>
        </div>
        </>
    )
}
