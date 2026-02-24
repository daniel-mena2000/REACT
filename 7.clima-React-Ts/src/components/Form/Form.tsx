import { useState } from "react"
import { countries } from "../../data/countries"
import styles  from './Form.module.css'
import type { SearchType } from "../../types"
import { Alert } from "../Alert/Alert"

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}



export function Form({fetchWeather}: FormProps) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setSearch({
            ...search,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }
//Solo si los campos estan llenos se manda a llamar nuestro customehook
        fetchWeather(search)
    }

    return(
        <form
        onSubmit={handleSubmit}
        className={styles.form}>

            {
                alert && <Alert>{alert}</Alert>
            }
            <div className={styles.field}>
                <label htmlFor="">Ciudad: </label>
                <input
                type="text"
                id="city"
                name="city"
                placeholder="Ingresa la Ciudad"
                onChange={handleChange}
                />
            </div >

            <div className={styles.field}>
                <label htmlFor="country">Pais: </label>

                <select value={search.country} name="country" id="country" onChange={handleChange} >
                <option value="">-- Selecciones un Pais --</option>

                {countries.map(item => (
                    <option value={item.code} key={item.code}>
                        {item.name}
                    </option>
                ))}
                </select>
            </div>

            <input className={styles.submit} type="submit" value="Consultar Clima" />
        </form>
    )
}
