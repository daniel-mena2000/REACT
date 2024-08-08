
export function Items({item,agregarProd}) {


    return(
        <>
        <div className="item">
            <span className="titulo-item">{item.name}</span>
            <img src={`img/${item.image}.png`} alt="" className="img-item" />
            <span className="precio-item">${item.price}</span>
            <button className="boton-item" onClick={() => agregarProd(item)}>Agregar al Carrito <i className="fa-solid fa-cart-plus"></i></button>
        </div>


        </>
    )
}
