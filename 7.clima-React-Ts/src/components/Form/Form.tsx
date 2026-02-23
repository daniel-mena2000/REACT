import { useState } from "react"
import { countries } from "../../data/countries"
import styles  from './Form.module.css'
import type { SearchType } from "../../types"

export function Form() {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setSearch({
            ...search,
            [e.target.id]: e.target.value
        })
    }


    return(
        <form className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="">Ciudad: </label>
                <input
                type="text"
                id="city"
                name="city"
                placeholder="Ciudad"
                onChange={handleChange}
                />
            </div >

            <div className={styles.field}>
                <label htmlFor="country">Pais: </label>
                <option value="">-- Selecciones un Pais --</option>

                <select value={search.country} name="country" id="country" onChange={handleChange} >

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
