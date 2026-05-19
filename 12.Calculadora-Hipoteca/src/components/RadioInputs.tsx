type RadioInputsProps = {
    label: string
    value?: string
}



export function RadioInputs({label, value, ...props}: RadioInputsProps) {
    return(
            <label htmlFor={label} className="border border-slate-500 rounded-sm flex items-center gap-2 px-2 w-full h-11.5 mb-3 cursor-pointer hover:border-lime hover:bg-lime/10 has-checked:bg-lime/10 has-checked:border-lime">
                <input {...props} value={value || label} name="mortgageType" id={label} type="radio"
                className=" appearance-none w-4 h-4 rounded-full border-2 border-slate-500 checked:border-lime checked:bg-lime-200
            cursor-pointer
    "/>
                <span>
                    {label}
                </span>
            </label>

    )
}
