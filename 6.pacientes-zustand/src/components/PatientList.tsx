import { usePatientStore } from "../store/store"
import { PatientDetails } from "./PatientDetails"

export function PatientList() {

    const patients = usePatientStore(state => state.patients)

    return(
        <div className="relative md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll p-5">

            <div
                className="absolute inset-0 bg-no-repeat bg-center bg-contain
                           opacity-10 pointer-events-none"
                style={{ backgroundImage: "url('/img-veterinaria.png')" }}
            ></div>

            <div className="relative">

                {patients.length ? (
                   <>
                    <h2 className="font-black text-3xl text-center">
                        Listado de Pacientes
                    </h2>

                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus{' '}
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
                            Tu lista de pacientes empieza{' '}
                            <span className="text-indigo-600 font-bold">
                                aquí
                            </span>
                        </p>
                    </>
                )}

            </div>
        </div>
    )
}
