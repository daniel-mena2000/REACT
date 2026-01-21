import { Activity } from "../types"
import { categorias } from "../data/categories"
import { useMemo } from "react"
type ActivitiListProps = {
    activities: Activity[]
}

export function ActivitiList({activities}: ActivitiListProps) {

    const categoryName = useMemo(() =>
         (category: Activity['category']) => categorias.map(cat => cat.id === category ? cat.name : ''), [activities])

    return(
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

                {activities.map(item => (
                    <div key={item.id} className="px-5 py-10 bg-slate-100 mt-5 flex justify-between">
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${item.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(Number(item.category))}</p>
                            <p className="text-2xl font-bold pt-5">{item.name}</p>
                            <p className="font-black text-4xl text-indigo-500">{item.calories}<span>Calorias</span></p>
                        </div>

                        <div>

                        </div>
                    </div>
                ))}
        </>
    )
}
