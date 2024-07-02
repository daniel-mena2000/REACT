import { useEffect, useState } from 'react'
import { Header } from './components/Header.jsx'
import { Card } from './components/Card.jsx'
import './App.css'
import { db } from './data/data.js'
function App() {


 const [data, setData] = useState([]);

  const [cart, setCart] = useState([]);


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
    console.log("Ya existe");

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

  return (
    <>
    <Header cart={cart}/>
  

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
