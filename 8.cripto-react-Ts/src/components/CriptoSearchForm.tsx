import { useState } from "react"
import { currencies } from "../data"
import { useCryptoStore } from "../store"
import type { PairType } from "../types"
import { ErrorMessage } from "./ErrorMessage"

export default function CriptoSearchForm() {

    const cryptocurrencies = useCryptoStore((state) => state.crytocurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)


    const [pair, setPair] = useState<PairType>({
        currency: '',
        criptocurrency: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setPair({
                ...pair,
                [e.target.name]: e.target.value
            })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
//Convertimos pair en array y verificamos que no esten vacios
          if (Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
    //Si pasa la validacion mostramos la info de la API y borramos el mensaje de error
    setError('')
    fetchData(pair)

    }
//Si tenemos algo en "error" renderizamos el componente
    return(
        <form className="form" onSubmit={handleSubmit}>

             {
                error && <ErrorMessage>{error}</ErrorMessage>
            }

            <div className="field">
                <label htmlFor="currency">Moneda: </label>
                <select name="currency" id="currency" onChange={handleChange} value={pair.currency}>
                    <option value="">-- Seleccione --</option>
                    {currencies.map(item => (
                        <option key={item.code} value={item.code}>{item.name}</option>
                    ))}
                </select>
            </div>


            <div className="field">
                <label htmlFor="criptocurrency"></label>
                <select name="criptocurrency" id="criptocurrency"
                 onChange={handleChange}
                 value={pair.criptocurrency}
                 >
                    <option value="">-- Seleccione --</option>
                    {cryptocurrencies.map(item => (
                        <option
                            value={item.CoinInfo.Name}
                            key={item.CoinInfo.Name}
                        >
                            {item.CoinInfo.FullName}
                        </option>
                    ))}
                </select>
            </div>

            <input type="submit" value="Cotizar" />

        </form>
    )
}
