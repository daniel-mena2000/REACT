import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header.jsx';
import { Item } from './components/Item.jsx';
import {dbGuitar} from './data/dataGuitar.js'
function App() {

const [guitar, setGuitar] = useState([])
const [cart, setCart] = useState([])
useEffect(()=>{
    setGuitar(dbGuitar)
},[])

function agregarCart(product) {
    const productoExistente = cart.findIndex(item => item.id === product.id)
    if (productoExistente >= 0) {
        const aumentarCantidad = [...cart];
        aumentarCantidad[productoExistente].cantidad ++
        setCart(aumentarCantidad)
    }else{
        product.cantidad = 1
        setCart([...cart, product])
    }
}

function aumnetarCantidad(aumentarId) {

  const verificarSuma = cart.map(item => {
        if (item.id === aumentarId) {
            return{
                ...item,
                cantidad: item.cantidad + 1
            }
        }
        return item;
    })
    setCart(verificarSuma)
}


function decrementarCantidad(aumentarId) {

    const verificarSuma = cart.map(item => {
          if (item.id === aumentarId) {
              return{
                  ...item,
                  cantidad: item.cantidad - 1
              }
          }
          return item;
      })
      setCart(verificarSuma)
  }

function eliminarProducto(id) {
    setCart(cart.filter(item => item.id !== id))
}

return(
  <>
    <Header guitarCart={cart} aumentar={aumnetarCantidad} restar={decrementarCantidad} quitar={eliminarProducto}/>

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {guitar.map(item => (
            <Item key={item.id} item={item} agregarCart={agregarCart}/>
            ))}
        </div>
        </main>
  </>
)

}



export default App
