import { useState } from 'react'
import './App.css'
import { Form } from './components/Form.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header className='bg-slate-500 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between'>
            <h1 className='text-center text-lg font-bold uppercase text-white'>Contador de Calorias</h1>
        </div>
    </header>

    <section className='bg-orange-300 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
        <Form />
        </div>

    </section>
    </>
  )
}

export default App
