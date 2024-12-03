import { menuItems } from './data/bd.ts'
import { MenuItem } from './components/MenuItem.tsx'
import { useOrder } from './hooks/useOrder.ts'
import OrderTotals from './components/OrderTotals.tsx'
import PropinaPorcentaje from './components/PropinaPorcentaje.tsx'

import './App.css'
import { OrderContens } from './components/OrderContents.tsx'

function App() {

    const {order, addItem, removeItem, tip, setTip} = useOrder()

  return (
    <>
    <header className='bg-gray-800 py-5'>
        <h1 className='text-center text-4xl font-black text-red-300'>Calculadora de propinas y consumo         <i className='bx bx-money-withdraw'></i>
        </h1>
    </header>

    <main className='max-w-7xl mx-auto mt-20 grid md:grid-cols-2'>
        <div className='p-5'>
        <h2 className='text-4xl font-black'>Menú <i className='bx bx-food-menu'></i></h2>

        <div className='space-y-3 mt-10'>
        {menuItems.map(item => (
            <MenuItem key={item.id} item={item} addItem={addItem}/>
        ))}
        </div>
        </div>

        <div className='border border-dashed border-slate-300 p-5 rounded-lg space-y-10'>
            <OrderContens order={order} removeItem={removeItem}/>
            <PropinaPorcentaje setTipe={setTip}/>
            <OrderTotals order={order}/>
        </div>
    </main>
    </>
  )
}

export default App
