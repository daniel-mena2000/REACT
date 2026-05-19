import {Results, Form, Instructions } from "../components";
import { useContext } from "react";
import { PaymentContext } from "../contexts/payment-context";

export function Calculator() {
    const context = useContext(PaymentContext)
    return(
        <>
            <div className={`md:max-w-172 md:my-10 md:rounded-2xl overflow-hidden
                lg:flex lg:max-w-252
                `}>
                <Form styles="flex-1"/>

                <div className="flex-1 bg-white">
                    {context.result.monthlyPayment === 0 ? <Instructions/> : <Results/> }

                </div>
            </div>
        </>
    )
}
