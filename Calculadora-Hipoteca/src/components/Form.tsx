import { Input, RadioInputs, Button } from "../components";
import { useForm, type SubmitHandler } from "react-hook-form";
import { calculateMortgage, type  MortgageType} from "../utils/calculateMortgage";
import { useContext } from "react";
import { PaymentContext } from "../contexts/payment-context";

//3:53:00 A mi lo que me funciono fue colocarle el value a los Radio Eje: value="Repayment", obvio indicándole al componente que va a recibir ese value, por si les ayuda a algunos, pero creo que al profe le funciono sin colocarlos ya que como que coloco los value en el register no lo se supongo que fue eso.

type FormProps = {
    styles: string
}

type Inputs = {
    mortgageAmount: number
    mortgageTerm: number
    interesRate: number
//En los radios no colocamos string ya que eso seria que puede aceptar cualquier texto, por eso le pasamos las opciones con un unionType
    mortgageType: MortgageType
}

export function Form({styles=''}: FormProps) {

const context = useContext(PaymentContext)

//Ahora ya sabe que tipos vamos a registrar en "register" handleSubmit necesita una fncion que lo ejecute
const { register, handleSubmit,reset, formState:{errors}} = useForm<Inputs>()

//Para entrar a los valores del formulario, mandamos llamar SubmitHandler, le pasamos los tipos que recibe nuestro formulario, y ahora ya podemos mandar llamar "data" que igual es de tipo Inputs, el "handleSubmit" del Form se encarga de pasar la informacion del formulario a "data"
const sendForm: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log('enviado');
//Destructuramos data
    const {mortgageAmount, mortgageTerm, interesRate, mortgageType} = data
//Pasamos la info que requiere la funcion para hacer el calculo
//Recordar que la funcion devuelve "pago mensual" y el "pago total" destructuramos la funcion para obtenerlos

   const {monthlyPayment, totalRepay} = calculateMortgage(mortgageAmount, mortgageTerm, interesRate, mortgageType)

//Mandamos llamar la funcion que actualizar el estado, este se mandara llamar cuando se de click
    context.setResults({
       monthlyPayment,
       totalRepay
    })
    reset()
}

const clearAll = () =>{
    context.setResults({
        monthlyPayment: 0,
        totalRepay: 0
    })
    reset()
}

    return(
        <>
            <form onSubmit={handleSubmit(sendForm)} className={` bg-white px-6 py-8`}>
               <div className="md:flex md:justify-between md:mb-10">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0 ">Mortgage Calculator</h1>
                    <button type="button"
                     className="underline text-slate-700 mb-6 cursor-pointer md:mb-0"
                     onClick={clearAll}
                     >Clear ALL</button>
               </div>

                <div className="flex flex-col gap-6">
                    <Input label="Mortgage Amount" unit="$"
                    {...register("mortgageAmount", { required: true, valueAsNumber: true, min:{value:0.01, message: "El valor debe ser mayor a 0"}, })}
                    error = {errors.mortgageAmount?.type === 'required' }
                    />

                    <div className="md:flex md:gap-6 ">
                        <Input label="Mortgage Terms" unit="years"
                    {...register("mortgageTerm", { required: true, valueAsNumber: true, min:{value:0.01, message: "El valor debe ser mayor a 0"} })}
                    error = {errors.mortgageTerm?.type === 'required' }

                         />

                        <Input label="Interest Rate" unit="%"
                        {...register("interesRate", { required: true, valueAsNumber: true, min:{value:0.01, message: "El valor debe ser mayor a 0"} })}
                        error = {errors.interesRate?.type === 'required' }

                        />
                    </div>
                </div>

                <h2 className="text-slate-700 mb-3 mt-5">Mortgage Type</h2>
                <RadioInputs label="Repayment"
                    value="Repayment"
                    {...register("mortgageType", {required: true})}
                />

                <RadioInputs label="Interest Only"
                    value="Interest Only"
                    {...register("mortgageType",{required: true})}
                />
                {errors.mortgageType && <p className="text-red text-sm m-3">This field is required</p>}

                <Button/>
            </form>
        </>
    )
}
