import { useMemo } from "react";


export function Header({cart, eliminarItem, incrementarCantidad, decrementarCantidad}) {


//Cuando utilizas `useMemo`, estás indicando a React que memorice el valor devuelto por una función y solo lo recalcule cuando las dependencias especificadas cambien. Esto es útil cuando tienes una función que se ejecuta dentro de un componente de React y produce un valor computacionalmente intensivo. Al memoizar este valor, puedes evitar que se recalcule cada vez que el componente se vuelva a renderizar, siempre y cuando las dependencias no cambien.
// Debes mandar llamar las funciones sin parentesis
// State derivado
    const isEmpty = useMemo (() => cart.length === 0, [cart]);
// Total es el valor acumulado, item el valor actual, y iniciamos en 0
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return(
        <>
          <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="./public/img/logo.png" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div
                        className="carrito"
                    >
                        <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {isEmpty ? (
                                <p className="text-center">El carrito esta vacio</p>

                            ): (

                          <>
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id}>
                                        <td>
                                            <img className="img-fluid" src={`/img/${item.image}.jpg`} alt="imagen guitarra" />
                                        </td>
                                        <td>{item.name}</td>
                                        <td className="fw-bold">
                                            {item.price * item.quantity}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => decrementarCantidad(item.id)}
                                            >
                                                -
                                            </button>
                                                {item.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => incrementarCantidad(item.id)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => eliminarItem(item.id)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
{/* PARA PODER AGREGAR OTROS ELEMENTOS APARTE DE TABLE EN ESTE CASO P, ENCAPSULAMOS EN UN "FRAGMENT" */}
                            <p className="text-end">Total pagar: $<span className="fw-bold">{cartTotal}</span></p>
                            <button className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>

                            </>

                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
        </>
    )
}
