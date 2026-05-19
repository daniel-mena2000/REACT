import { Payments } from "./Payments"

export function Results(){
    return(
        <div className="bg-slate-900 text-white py-8 px-6 lg:h-full lg:rounded-bl-[80px]">
            <h2 className="text-2xl mb-6">Your results</h2>
            <p className="text-slate-300 mb-6">Your results are shown below based the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>

            <Payments/>
        </div>
    )
}
