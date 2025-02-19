import './App.css'
import { Form } from './components/Form'
function App() {

  return (
    <>

    <header className='bg-indigo-400 py-3'>
        <div className='max-w-4xl mx-auto flex justify-between'>
            <h1 className='text-center text-lg font-bold uppercase text-white'>Contador de Calorias</h1>
        </div>
    </header>

    <section className='bg-indigo-600 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
        <Form />
        </div>

    </section>
    </>
  )
}

export default App
