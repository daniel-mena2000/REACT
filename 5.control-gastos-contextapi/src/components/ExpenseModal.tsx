import { categories } from "../db/categories"

type ExpenseModalProps = {
  open: boolean
  onClose: () => void
}

export default function ExpenseModal({ open, onClose }: ExpenseModalProps) {
  if (!open) return null

  return (
    <form action="">

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-sky-600 py-2">
            Nuevo gasto
        </legend>

         <div className="flex flex-col gap-2 mt-2">
           <label htmlFor="expenseName" className="font-bold">Nombre del gasto: </label>

            <input
            type="text"
            placeholder="Ingresa el nombre del gasto"
            className="bg-slate-100 p-2"
            id="expenseName"
            name="expenseName"
            />
        </div>

       <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="amount" className="font-bold">Cantidad: </label>
             <input
            type="number"
            placeholder="Ingresa la cantidad del gasto Ej.300"
            className="bg-slate-100 p-2"
            id="amount"
            name="amount"
            />
       </div>

        <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="amount" className="font-bold">Categoria: </label>

            <select className="bg-slate-100 p-2" name="category" id="category">
                <option value="">-- Seleccione --</option>
                {categories.map(item => (
                    <option value={item.id} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>

        <input
          type="date"
          className="border p-2 w-full mb-4"
        />

      <input type="submit" className="bg-sky-600 text-white px-4 py-2 rounded-lg w-full font-bold uppercase"
            value={'Registrar Gasto'}
      />

        <button
          onClick={onClose}
          className="mt-3 text-blue-600 w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
    </form>
  )
}
