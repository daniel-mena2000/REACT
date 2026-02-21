import { useForm } from "react-hook-form"
import {toast}  from 'react-toastify'
import { Error } from "./Error";
import type { DraftPatient } from "../types";
import { usePatientStore } from "../store/store";
import { useEffect } from "react";


export default function PatientForm() {

    const addPatient = usePatientStore(state => state.addPatient)
    const activeId = usePatientStore(state => state.activeId)
    const patients = usePatientStore(state => state.patients)
    const updtaePatient = usePatientStore(state => state.updtaePatient)


//El id se generara una vez agregado al state la info, en este caso como solo es validacion y se pasa a register, no tiene un id en los inputs que le podamos pasar, por eso es de tipo "DraftPatient"

//setValue te permite regresar y setear valores a tu formulario, nor sirve para pasar la info al editar
    const {register, handleSubmit,setValue, formState: {errors}, reset} = useForm<DraftPatient>()

    useEffect(() => {
        if (activeId) {
//Nos traemos al paciente que tenga el midmo ID que activeId, posicion[0] para que devuelva un objeto de la primera coincidencia, y no regrese un array igual
            const activePatient = patients.filter(item => item.id === activeId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('email', activePatient.email)
            setValue('date', activePatient.date)
            setValue('symptoms', activePatient.symptoms)

        }
    },[activeId])

//"data" recuperara la info de lo que el usuario escribo en el formulario, esto evita usar UseState, es como un estado local
    const registerPatient = (data: DraftPatient) => {
//Si esta activo activeId significa que estamos editando
        if (activeId) {
            updtaePatient(data)
            toast.info('Paciente Editado con Exito')

        }else{

            addPatient(data)
            toast.success('Paciente Registrado con Exito')
        }
//La libreria nos da "reset" para reiniciar nuestro formulario
        reset()
    }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form onSubmit={handleSubmit(registerPatient)}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            noValidate
        >
              <div className="mb-5">
                  <label htmlFor="name" className="text-sm uppercase font-bold">
                      Paciente
                  </label>
                  <input
                      id="name"
                      className="w-full p-3  border border-gray-100"
                      type="text"
                      placeholder="Nombre del Paciente"
                      {...register('name', {
                        required: 'El nombre del paciente es obligatorio',
                        maxLength: {
                            value: 40,
                            message: 'Maximo 40 Caracteres'
                        }
                      })}

                  />
                  {errors.name && (
                   <Error>{errors.name?.message?.toString()}</Error>
                  )}

                  {errors.name && (
                   <Error>{errors.name?.message?.toString()}</Error>
                  )}


              </div>

              <div className="mb-5">
                <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                    Propietario
                </label>
                <input
                    id="caretaker"
                    className="w-full p-3  border border-gray-100"
                    type="text"
                    placeholder="Nombre del Propietario"
                      {...register('caretaker', {
                        required: 'El nombre del Propietario es obligatorio',
                        maxLength: {
                            value: 40,
                            message: 'Maximo 40 Caracteres'
                        }
                      })}
                />
                {errors.caretaker && (
                   <Error>{errors.caretaker?.message?.toString()}</Error>
                  )}
              </div>

            <div className="mb-5">
              <label htmlFor="email" className="text-sm uppercase font-bold">
                  Email
              </label>
              <input
                  id="email"
                  className="w-full p-3  border border-gray-100"
                  type="email"
                  placeholder="Email de Registro"
                  {...register("email", {
                        required: "El Email es Obligatorio",
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email No Válido'
                    }
                    })}
              />

                {errors.email && (
                   <Error>{errors.email?.message?.toString()}</Error>
                  )}
            </div>

            <div className="mb-5">
                <label htmlFor="date" className="text-sm uppercase font-bold">
                    Fecha Alta
                </label>
                <input
                    id="date"
                    className="w-full p-3  border border-gray-100"
                    type="date"
                        {...register('date', {
                        required: 'La fecha de alta es obligatoria',

                      })}
                />
                  {errors.date && (
                   <Error>{errors.date?.message?.toString()}</Error>
                  )}
            </div>

            <div className="mb-5">
                <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                Síntomas
                </label>
                <textarea
                    id="symptoms"
                    className="w-full p-3  border border-gray-100"
                    placeholder="Síntomas del paciente"

                        {...register('symptoms', {
                        required: 'Describa los sintomas del paciente',
                      })}
                ></textarea>
                   {errors.symptoms && (
                   <Error>{errors.symptoms?.message?.toString()}</Error>
                  )}
            </div>

            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value='Guardar Paciente'
            />
        </form>
    </div>
  )
}
