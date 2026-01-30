import { Activity } from "../types"
import { categorias } from "../data/categories"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducers"

type ActivitiListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}

export function ActivitiList({activities, dispatch}: ActivitiListProps) {
//Este codigo es para sacar el name de las categoriass
    const categoryName = useMemo(() =>
         (category: Activity['category']) => categorias.map(cat => cat.id === category ? cat.name : ''), [activities])

function edit(idEdit: Activity['id']) {
    dispatch({type:'set-activeId', payload: {id: idEdit }})
}

function eliminar(idDelete: Activity['id']) {
    dispatch({type: 'delete-activity', payload:{id: idDelete}})

}
    return(
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>

                {
                activities.length === 0 ? <p className="text-center pt-10">No hay actividades aún...</p> :
                activities.map(item => (
                    <div key={item.id} className="px-5 py-10 bg-slate-100 mt-5 flex justify-between shadow">
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${item.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(Number(item.category))}</p>
                            <p className="text-2xl font-bold pt-5">{item.name}</p>
                            <p className="font-black text-4xl text-indigo-500">{item.calories}<span> Calorias</span></p>
                        </div>

                        <div className="flex gap-5 items-center">
                            <button onClick={() => edit(item.id)}>
                                <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                            </button>
                            <button onClick={() => eliminar(item.id)}>
                                <XCircleIcon className="h-8 w-8 text-rose-600"/>
                            </button>
                        </div>


                    </div>
                ))}
        </>
    )
}
