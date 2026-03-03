import type { ReactNode } from "react";


export function ErrorMessage({children}: {children: ReactNode}) {
    return(
        <>
            <div>
                {children}
            </div>
        </>
    )
}
