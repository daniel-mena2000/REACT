type InputProps = {
    label: string
    unit: string
    error: boolean
}

//Para que funcione el reactHookForm, y los inputs se registren, tenemos que pasarle el register a cada input, y para eso tenemos que colocar el ...props, para que sepa que le vamos a pasar mas cosas, y asi pueda registrar cada input sin problemas
export function Input({label, unit,error, ...props}: InputProps) {
    return(
        <div className="md:w-full">

            <label htmlFor="label" className="mb-2 block text-slate-700">{label}</label>

        <div className="relative">
            <input
            step={0.01}
                    type="number"
                    id={label}
                    {...props}
                    className={`
                        ${error ? 'outline-red-500' : 'outline-slate-500'}
                        peer
                        outline rounded-sm
                        appearance-none font-bold
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        w-full mt-3 h-11
                        ${unit === '$' ? 'pl-9' : 'pl-3'}`}
                />

    <span
        className={`${error ? 'bg-red-300' : 'bg-slate-100' } peer-focus:bg-lime text-slate-700 font-bold  absolute top-3 h-11 w-auto p-2 flex items-center justify-center ${unit === '$' ? 'left-0 rounded-l-sm' : 'right-0 rounded-e-sm'}`}>  {unit}
    </span>
</div>
        {error && <p className="text-red text-sm mt-3">This field is required</p>}
        </div>
    )
}
