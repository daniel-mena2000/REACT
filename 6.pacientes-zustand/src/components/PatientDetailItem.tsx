
type PatientDetailsItem = {
    label: string
    data: string
}

export function PatientDetailItem({label, data}: PatientDetailsItem) {
    return(
          <p className="font-bold mb-3 text-gray-700 uppercase">
                {label}: {''}
                <span className="font-normal normal-case">{data}</span>
         </p>
    )
}
