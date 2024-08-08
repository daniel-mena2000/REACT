import './App.css';
import { dbGuitar } from './data/dataGuitar.js';
import { Header } from './components/Header.jsx';
import { Card } from './components/Card.jsx';
import { useEffect, useState } from 'react';
function App() {

const [data, setData] = useState([]);
const [cart, setCart] = useState([]);

useEffect(()=>{
  setData(dbGuitar)
},[])
function agregarCarrito(item) {

const itemExisted = cart.findIndex(itemGuitar => itemGuitar.id === item.id);
    if (itemExisted >= 0) {
        const updateCart = [...cart];
        updateCart[itemExisted].cantidad ++;
        setCart(updateCart)
   }else{
    item.cantidad = 1;
    setCart([...cart, item])
   }
}
return(
  <>
  <Header cart={cart}/>

  <main className='container-xl mt-5'>
  <h2 className="text-center">Nuestra Colección</h2>
  <div className='row mt-5'>
    {data.map(item => (
      <Card key={item.id} info={item} agregarCarrito={agregarCarrito}/>
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
