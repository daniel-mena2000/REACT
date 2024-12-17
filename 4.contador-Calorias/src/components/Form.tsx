import { useState } from "react"
import { categorias } from "../data/categories"

export function Form() {
// Podriamos crear "states" separados para: categoria, actividad y calorias pero estos estan relacionados y dependen uno del otro asi que solo haremos uno para todos.
const [activity, setActivity] = useState({
    category: 1,
    name: '',
    calories: 0
})

const handleChange = (e) => {
// e.target.id: Nos permitira saber sobre que elemento estoy escribiendo gracias al id
// e.target.value: Nos dira que es lo que el usuario esta escribiendo
// Es importante hacer una copia del state para que no borre la referencia
    setActivity({
        ...activity,
        [e.target.id]: e.target.value  //Ejemplo: (id:name: value:comida)
    })
}

    return(
        <>
        <form className="space-y-5 bg-white shadow p-10 rounded-lg">
            <label htmlFor="category">Categoria</label>
            {/* Le asignaremos el "value" lo que valga el valor de category del estado el valor en este caso 1 sera comida y 2 ejercicio, dejaremos 1 por defecto*/}
            <select id="category" className="border border-slate-300 p-2 rounde-lg w-full bg-white"
             value={activity.category}
            //  Usaremos un onchange para detectar cambios para ir cambiando el value del los inputs
             onChange={handleChange}
             >
            {categorias.map(item => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
            </select>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold bg-white">Actividad:</label>
                <input
                id="name" type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
        // Asigname el "value" al valor del estado
                value={activity.name}
                onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold bg-white">Calorias:</label>
                <input id="calories" type="number"
                 className="border border-slate-300 p-2 rounded-lg"
                 placeholder="calorias. Ej.300 o 500"
                 value={activity.calories}
                 onChange={handleChange}

                 />


            </div>
            <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer" value='Guardar Comida o Guardar Ejercicio'/>
        </form>
        </>
    )
}