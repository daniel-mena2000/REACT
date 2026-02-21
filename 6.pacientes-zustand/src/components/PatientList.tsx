import { usePatientStore } from "../store/store"
import { PatientDetails } from "./PatientDetails"


export function PatientList() {

    const patients = usePatientStore(state => state.patients)

    return(
        <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
            {patients.length ? (
               <>
                <h2 className="font-black text-3xl text-center"></h2>
                <p className="text-xl mt-5 mb-10 text-center">
                    Administra tus {''}
                   <span className="text-indigo-600 font-bold">
                        Pacientes y Citas
                    </span>
                </p>
                  {patients.map(item => (
                        <PatientDetails
                        key={item.id}
                        item={item}
                        />
                    ))}
               </>

            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">
                        No hay pacientes
                    </h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Tu lista de pacientes empieza {''}
                        <span className="text-indigo-600 font-bold">
                            aqui
                        </span>
                    </p>

                </>
            )}
        </div>
    )
}
