import type { Guitar } from '../types/types.ts';

// Los types que solo vas a usar en un solo componente se quedan en el archivo donde los usaras
interface GuitarProps  {
    guitar: Guitar;
/*addToCart: (item: Guitar) => void: Esto define una propiedad addToCart que es una función que toma un argumento de tipo Guitar y no retorna ningún valor (void).
 En este caso, addToCart es una función que espera un parámetro de tipo Guitar. */
//  void: Indica que la función no devuelve ningún valor. Es decir, la función realiza una acción pero no retorna ningún dato.
    addToCart: (item: Guitar) => void
}


export default function Guitar({guitar, addToCart}: GuitarProps) {

    const { id, name, image, description, price } = guitar


    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}
