
export function Card({info,agregarCarrito}) {
    return(
        <>
         <div className="col-md-6 col-lg-4 my-4 row align-items-center">
         <div className="col-4">
             <img className="img-fluid" src={`/public/img/${info.image}.jpg`} alt="imagen guitarra"/>
         </div>
         <div className="col-8">
             <h3 className="text-black fs-4 fw-bold text-uppercase">{info.name}</h3>
             <p>{info.description}</p>
             <p className="fw-black text-primary fs-3">${info.price}</p>
             <button type="button"className="btn btn-dark w-100"
             onClick={() => agregarCarrito(info)}
             >Agregar al Carrito</button>
         </div>
     </div>
        </>
    )
}
