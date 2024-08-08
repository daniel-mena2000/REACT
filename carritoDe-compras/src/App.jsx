import { useEffect, useState } from 'react'
import { Header } from './components/Header.jsx'
import { Card } from './components/Card.jsx'
import './App.css'
import { db } from './data/data.js'
function App() {


 const [data, setData] = useState([]);

  const [cart, setCart] = useState([]);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;


 useEffect(() => {
    setData(db)
 },[])

//  No es normal que en el carrito se encuentren 2 veces el mismo producto si no solo aumente la cantidad
// Identidicando si se duplica un elemento en el estado con "findIndex"
// Dara -1 si no se cumple la condicion o en este caso no existe en el carrito si si se cumple o asea que si existe nos lanzara su "indice"

function agregarProduct(item) {
// itemExistente: Es el índice del producto en el carrito que coincide con el producto que se está intentando agregar. Este índice se obtiene usando findIndex:
  const itemExistente = cart.findIndex(itemCart => itemCart.id === item.id );
  console.log(itemExistente);
  if (itemExistente >= 0) { //Existe en el carrito
    if (cart[itemExistente].quantity >= MAX_ITEMS) return
    console.log("Ya existe");
// Hacemos copia de nuestro carrito
    const aumentarCantidad = [...cart];
// Si por ejemplo le damos al elemento del indice 2 es como decir (auemntarCantidad[2].quantity++) es decir que al elemento del indice 2 le aumente la cantidad
    aumentarCantidad[itemExistente].quantity++;
// Seteamos
    setCart(aumentarCantidad)

  }else{
    console.log("No existe... agregando");
// Es normal que cuando agregas un producto sea 1
// A un que este no este en el archivo "data" este se esta agregando desde aqui
    item.quantity = 1;
    setCart([...cart, item])
  }
}

function eliminar(idDelete) {
    setCart(cart.filter(item => item.id !== idDelete))
}
function incrementarCantidad(id) {
/* map a diferencia de foreach nos devuelve un array nuevo ambos nos sirven para iterar array pero map nos permite almacenar un valor nuevo en la variable*/
        const updateCart = cart.map(item => {
// Le decimos si el id del carrito el igual al id que le estamos pasando, si si entonces quiero aumentar las cantidades
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return{
// se usa para crear una copia del objeto item y actualizar solo una de sus propiedades (en este caso, quantity)
// sto significa: "crea un nuevo objeto que tenga todas las propiedades de item, pero establece quantity en item.quantity + 1".
            ...item, // Copia todas las propiedades de 'item'
            quantity: item.quantity + 1  // Sobrescribe la propiedad 'quantity' con un nuevo valor
                }
            }
// Dentro de la función map, return item se usa para devolver el mismo objeto sin modificarlo si la condición if (item.id === id) no se cumple.
            return item
        })
  // Actualizamos el estado del carrito con el nuevo array.
//   Igual podemos setear al inicio de todo pero en este caso sera asi para un mejor control
        setCart(updateCart)
}

function decrementarCantidad(id) {
    const updateDecrementar = cart.map(item => {
        if (item.id === id && item.quantity > MIN_ITEMS) {
            return{
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item;
    })
    setCart(updateDecrementar)
}
  return (
    <>
    <Header cart={cart} eliminarItem={eliminar} incrementarCantidad={incrementarCantidad} decrementarCantidad={decrementarCantidad}/>


    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
        {data.map(item => (
          <Card key={item.id} data={item} agregarProduct={agregarProduct}/>
        ))}
          </div>

    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
