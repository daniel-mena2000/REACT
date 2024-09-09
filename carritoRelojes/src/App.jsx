import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header.jsx'
import { Items } from './components/Items.jsx';
import { dbReloj } from "./dataReloj.js";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

function agregarProducto(prod) {
    const existe = cart.findIndex(item => item.id === prod.id)

    if (existe >= 0) {
        console.log("existe");
        const copia = [...cart]
        cart[existe].cantidad++
        setCart(copia)

    }else{
        prod.cantidad = 1
        setCart([...cart, prod])

    }

}

  useEffect(()=>{
    setData(dbReloj)
  },[])

  return (
    <>
    <Header cart={cart}/>


    <section className="contenedor">
    <div className="contenedor-items">
    {data.map(item => (
        <Items key={item.id} item={item} agregarProd={agregarProducto}/>
    ))}
      </div>
      </section>
    </>
  )
}

export default App
