export function Card({data,  agregarProduct}) {
// Podemos hacer Destrucuturing y simplificar los valores

const {image,name,price,id,description} = data

  return(
<>
  
       <div className="col-md-3 col-lg-4 my-md-3">
       <img src={`img/${image}.jpg`} className="fluid card-img-top" alt="..." />
       <div className="col card-body">
         <h5 className="card-title">{name}</h5>
         <p className="card-text">{description}</p>
         <p className="fw-black text-primary fs-3">{`$${price}`}</p>

         <a href="#" className="btn-add"
         onClick={() => agregarProduct(data)}
         >Agregar al carrito</a>
       </div>
     </div>

</>      
     
  )
}