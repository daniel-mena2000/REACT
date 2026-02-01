import { menuItems } from './data/bd.ts'
import { MenuItem } from './components/MenuItem.tsx'
import OrderTotals from './components/OrderTotals.tsx'
import PropinaPorcentaje from './components/PropinaPorcentaje.tsx'
import { orderReducer, initialState } from './reducers/orderReducer.tsx'
import './App.css'
import { OrderContens } from './components/OrderContents.tsx'
import { useReducer } from 'react'

function App() {


    const [state, dispatch] = useReducer(orderReducer, initialState)


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
            <MenuItem key={item.id} item={item} dispatch={dispatch}/>
        ))}
        </div>
        </div>

        <div className='border border-dashed border-slate-300 p-5 rounded-lg space-y-10'>
    {/* Pasaremos a una condicional el menu de totales para que no se muestre si la orden esta vacia */}

            {state.order.length > 0? (
                <>
                    <OrderContens order={state.order} dispatch={dispatch}/>
                    <PropinaPorcentaje dispatch={dispatch} tip={state.tip}/>
                    <OrderTotals order={state.order} tip={state.tip} dispatch={dispatch}/>
                </>
            ):
            <p className="text-center text-2xl">La orden esta vacia <i className='bx bx-sad'></i></p>

            }

        </div>
    </main>
    </>
  )
}

export default App
