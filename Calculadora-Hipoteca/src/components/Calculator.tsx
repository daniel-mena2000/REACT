import {Results, Form, Instructions } from "../components";



export function Calculator() {
    return(
        <>
            <div className={`md:max-w-172 md:my-10 md:rounded-2xl overflow-hidden
                lg:flex lg:max-w-252
                `}>
                <Form styles="flex-1"/>

                <div className="flex-1 bg-white">
                    {/*<Instructions/>*/}
                    <Results/>
                </div>
            </div>
        </>
    )
}
