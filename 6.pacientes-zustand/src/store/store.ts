import { create } from 'zustand'
import {v4 as uuidv4} from 'uuid'
import type { DraftPatient, RegisterPatientType } from '../types'

type PatientState = {
    patients: RegisterPatientType[]
    addPatient: (data: DraftPatient) => void
}

//Como "patients[]" es de tipo "RegisterPatientType" es decir espera un ID, a la hora de pasar data, al "patients[]" este nos marcara que espera de tipo "DraftPatient" es por eso que creamos esta funcion, generando un paciente con la misma info pero ya con un ID

const createPatient = (patient: DraftPatient): RegisterPatientType => {
        return {...patient, id: uuidv4()}
}

//Como agregamos info a nuestro state de "patients[]" para eso tenemos set: para setear(agregar) un valor y get: para ver u obtener un valor de tu state
export const usePatientStore = create<PatientState>((set) => ({
    //Aqui vamos a colocar el state, asi como funciones que las modifican
    patients: [],
    
    addPatient: (data) => {
        const newPatient = createPatient(data)
        set((state) => ({
           patients: [...state.patients, newPatient]

        }))
    }

}))
