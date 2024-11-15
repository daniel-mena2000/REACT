import { useEffect, useState } from 'react'
import { Header } from './components/Header.jsx'
import { Card } from './components/Card.jsx'
import './App.css'
import { db } from './data/data.js'
function App() {
// - localStorage.getItem('cart'): Esta línea intenta obtener el valor asociado a la clave 'cart' desde localStorage. Si existe, lo devuelve como una cadena JSON.
// - JSON.parse(localStorageCart): Si se encontró algo en localStorage, lo convierte de una cadena JSON a un array de objetos (los elementos del carrito).
// -Si no hay nada en localStorage (null): Devuelve un array vacío [] como valor inicial del carrito.
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');

        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

 const [data, setData] = useState([]);
// Aquí, el estado cart se inicializa usando la función initialCart, asegurando que cuando la aplicación cargue, si hay algo en el carrito almacenado en localStorage, se cargue en el estado inicial del carrito. Si no hay nada, el carrito empieza vacío.
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;


 useEffect(() => {
    setData(db)
 },[])

//  Cada que "cart" cambie ejecutara el localStorage
// Como la respuesta del LocalStorage es mas rapida que cuando se llama todo lo anterior para agregar el item al carrito puede que tengamos problemas y no se agregue al localstorage por eso usaremos un useEffect para manejar el cambio secundario de nuestro state
 useEffect(()=>{
        // LocalStorage toma 2 parametros el primero el nombre de lo que quieres alamacenar es solo un identificador y segundo lo que deseas almacenar, No te permite alamacenar objetos y arrays solamente strings, entonces como nuestro carrito es un array lo tenemos que convertir a string con JSON.stringify()
        localStorage.setItem('cart', JSON.stringify(cart))
 },[cart])

//  No es normal que en el carrito se encuentren 2 veces el mismo producto si no solo aumente la cantidad
// Identificando si se duplica un elemento en el estado con "findIndex"
//findIndex: Nos dara -1 si no se cumple la condicion, si si se cumple nos lanzara el indice del elemento
// En este caso dara -1 si el producto no esta en el carrito y por lo tanto lo agregara con la logica de agregar
// Si volvemos a presionar el mismo elemento ya NO nos dara -1 si no el indice por que ya lo agrego es decir que entrara en el "if" de >=0 y entrara a la logica de solo aumentar la cantidad
function agregarProduct(item) {
// itemExistente: Es el índice del producto en el carrito que coincide con el producto que se está intentando agregar. Este índice se obtiene usando findIndex:
  const itemExistente = cart.findIndex(itemCart => itemCart.id === item.id );
  console.log(itemExistente);
  if (itemExistente >= 0) { //Existe en el carrito
// Tendremos el problema que al hacer click en agregarALCARRITO se ira amentando la cantidad aun que limitemos el boton de incrementar, es por eso que ira verificando que no pase el limite de MAX_ITEMS y si ya no se cumple entonces que no retorne nada, Accedemos a carrito, vemos la posicion y verificamos la cantidad.
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

function cleanCart() {
// Le mandaremos a setear un array vacio
    setCart([])
}



  return (
    <>
    <Header cart={cart} eliminarItem={eliminar} incrementarCantidad={incrementarCantidad} decrementarCantidad={decrementarCantidad} cleanCart={cleanCart}/>


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
