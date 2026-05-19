import calculatorIcon from "../assets/calculator.svg";

export function Button() {
    return(
        <>
           <button type="submit"
                className="
              bg-lime h-13.5 w-full rounded-full
              hover:bg-lime/50
                cursor-pointer
                flex items-center justify-center gap-3
                font-bold md:w-70">
            <img src={calculatorIcon} alt="Calculator" className="w-5 h-5" />

            Calculate Repayments
        </button>
        </>
    )
}
