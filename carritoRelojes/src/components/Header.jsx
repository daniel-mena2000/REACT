import { useState } from "react";
import { TotalCarrito } from "./TotalCarrito.jsx";
export function  Header({cart}) {
    const evaluarCarrito = () => (cart.length === 0);
    const evaluarTotal = () => (cart.reduce((total, cart) => total + (cart.cantidad * cart.price), 0))

    const [cartActivo, setCartActivo] = useState("desactivado")
    const evaluarVista = cartActivo ? "desactivado" : "activado"

    function activar() {
        setCartActivo(!cartActivo)
    }
    return(
        <>
    <header>
    <h1>Tienda de Relojes</h1>
        <div className="icon-cart">

            <i onClick={activar} className="fa-solid fa-cart-shopping"></i>

        </div>
    <div  className={`${evaluarVista} ${"carrito"}`} >
        <div className="header-carrito">
            <h2>Tu Carrito</h2>
        </div>

        <div className="carrito-items">
        {evaluarCarrito() ? (
                  <div className="vacio">
                  <p>El carrito esta vacio</p> <i className="fa-solid fa-heart-crack"></i>
              </div> ) : (
            <>
          {cart.map(itemCart => (
              <div key={itemCart.id} className="carrito-item">
                <img src={`img/${itemCart.image}.png`} alt="" width="80px" />
                <div className="carrito-item-detalles">
                    <span className="carrito-item-titulo">{itemCart.name}</span>
                    <div className="selector-cantidad">
                        <i className="fa-solid fa-minus restar-cantidad"></i>
                        <span className="carrito-item-cantidad">{itemCart.cantidad}</span>
                        <i className="fa-solid fa-plus sumar-cantidad"></i>
                    </div>
                    <span className="carrito-item-precio">${itemCart.price}</span>
                </div>
                <span className="btn-eliminar">
                    <i className="fa-solid fa-trash"></i>
                </span>
            </div>

          ))}
          <TotalCarrito total={evaluarTotal}/>

        </>
        )}

        </div>
        </div>

    </header>
        </>
    )
}
