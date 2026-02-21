import { create } from 'zustand'
import {devtools, persist} from 'zustand/middleware' //persist de zustand nos permite un estado persistente y puedes indicarle si quieres almacenar en sesionStorage o en localStorage
import {v4 as uuidv4} from 'uuid'
import type { DraftPatient, RegisterPatientType } from '../types'

type PatientState = {
    patients: RegisterPatientType[]
    activeId: RegisterPatientType['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: RegisterPatientType['id']) => void
    getPatientById: (id: RegisterPatientType['id']) => void
    updtaePatient: (data: DraftPatient) => void //Recordar que al pasar la info al formulario este no tiene Id, eso por eso que es de tipo "DraftPatient"


}

//Como "patients[]" es de tipo "RegisterPatientType" es decir espera un ID, a la hora de pasar data, al "patients[]" este nos marcara que espera de tipo "DraftPatient" es por eso que creamos esta funcion, generando un paciente con la misma info pero ya con un ID

const createPatient = (patient: DraftPatient): RegisterPatientType => {
        return {...patient, id: uuidv4()}
}

//Como agregamos info a nuestro state de "patients[]" para eso tenemos set: para setear(agregar) un valor y get: para ver u obtener un valor de tu state
export const usePatientStore = create<PatientState>()(
    devtools(
        persist((set) => ({
    //Aqui vamos a colocar el state, asi como funciones que las modifican
    patients: [],
    activeId: '',

    addPatient: (data) => {
        const newPatient = createPatient(data)
        set((state) => ({
           patients: [...state.patients, newPatient]

        }))
    },

    deletePatient: (id) =>{

        set((state) => ({
            patients: state.patients.filter(item => item.id !== id)
        }))
    },
//En este caso no requirimos un valor previo, por eso no colocamos "state" solo queremos escribir en activeId
    getPatientById: (id) => {
         set(() => ({
           activeId: id,
        }))

    },
    updtaePatient: (data) => {
        set((state) => ({
//Para actualizar vemos si en "patients[]" ya hay un elemento con el id de "activeId" si si retornamos el objeto asiganando el mismo Id que esta activo, y copia de la data que nos pasen, para no perder los demas pacientes, hacemos : item, zustand permite escribir en varios states al mismo tiempo en este caso reiniciaremos activeId una vez editado
            patients: state.patients.map(item => item.id === state.activeId ? {id: state.activeId, ...data} : item),
            activeId: ''

        }))
    }
}),
 {
    name: 'patient-store'

}) //sirve solo para Redux DevTools.Le pone nombre a tu store dentro de la extensión Redux DevTools.Sin eso, en la extensión verías algo como:<unknown>, No es obligatorio pero: Tienes varios stores, Usas microfrontends, Quieres distinguir stores en proyectos grandes, Estás debuggeando cosas complejas, igual nos sirve para localStorage, con este nombre lo identificaremos igual
))
