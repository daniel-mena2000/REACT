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

function agregarProduct(item) {
    setCart([...cart, item])
}

  return (
    <>
    <Header/>
  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
        {data.map(item => (
          <Card key={item.id} data={item} setCart={setCart} agregarProduct={agregarProduct}/>
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
