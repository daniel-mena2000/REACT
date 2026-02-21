import type { RegisterPatientType } from "../types"
import { PatientDetailItem } from "./PatientDetailItem"


type PatientDetailsProps = {
    item: RegisterPatientType
}

export function PatientDetails({item}: PatientDetailsProps) {
    return(
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem label='ID' data={item.id} />
            <PatientDetailItem label='Nombre' data={item.name} />
            <PatientDetailItem label='Propietario' data={item.caretaker} />
            <PatientDetailItem label='Email' data={item.email} />
            <PatientDetailItem label='Fecha Alta' data={item.date.toString()} />
            <PatientDetailItem label='Sintomas' data={item.symptoms} />

            <div className="flex justify-between mt-10">
                <button type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg">
                    Editar
                </button>

                 <button type="button" className="py-2 px-10 bg-red-500 hover:bg-red-600 text-white font-bold uppercase rounded-lg">
                    Eliminar
                </button>
            </div>
        </div>
    )
}
