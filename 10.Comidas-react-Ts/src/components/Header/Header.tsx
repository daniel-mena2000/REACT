import { useEffect, useMemo, useState } from "react"
import { useLocation, NavLink } from "react-router-dom"
import styles  from './Header.module.css'
import { useAppStore } from "../../stores/useAppStore"
import { Home, Bookmark } from "lucide-react"

export function Header() {

    const location = useLocation()
        const isHome = useMemo(() => location.pathname === '/' ,[location.pathname])

        const fecthRegions = useAppStore((state) => state.fetchRegions)
        const fetchCategories = useAppStore((state) => state.fetchCategories)
        const region = useAppStore((state) => state.region)
        const categories = useAppStore((state) => state.categories)
        const fetchFilterRegion = useAppStore((state) => state.fetchFilterRegion)
        const fetchFilterCategory = useAppStore((state) => state.fetchFilterCategory)




        useEffect(() => {
            fecthRegions()
            fetchCategories()


        },[])

        const [info, setInfo] = useState({
            regionS: '',
            category: ''
        })


        const handleChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
            setInfo({
                ...info,
                [e.target.name]: e.target.value
            })
        }

        const validarState = (): boolean => info.regionS !== '' || info.category !== ''


        const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault()

            setInfo({
                regionS: '',
                category: ''
            })

            if (info.regionS) {
                fetchFilterRegion(info.regionS)
            }

            if (info.category) {
                fetchFilterCategory(info.category)
            }else{

            }

        }

    return(
        <>
           <header className={styles.header}>
                <section className={styles.section_nav} >

                    <img className={styles.logo} src="/logo.png" alt="" />

                    <nav className={styles.nav_sec}>

                        <NavLink to="/"  className={({isActive }) =>
                            isActive ? styles.navLink_item_active : styles.navLink_color
                            }>
                            <Home size={15} /> Inicio
                        </NavLink>


                        <NavLink to="/favorites" className={({isActive }) =>
                            isActive ? styles.navLink_item_active : styles.navLink_color
                        }>
                                <Bookmark size={18} />   Recetas Guardadas
                        </NavLink>
                    </nav>

                </section>

                {isHome && (
                    <section className={styles.section_form}>
                        <h1 className={styles.h1_form}>Encuentra tu receta perfecta</h1>
                        <p className={styles.section_p}>Busca recetas por región o categoría</p>

                        <form className={styles.form} onSubmit={handleSubmit} >
                            <label htmlFor="regionS">Región: </label>
                             <select name="regionS" id="regionS" onChange={handleChange} value={info.regionS} disabled={info.category !==''  } >
                                <option value="" >--Elige una Región</option>
                                {region.map(item => (
                                    <option value={item.strArea} key={item.strArea}>{item.strArea}</option>
                                ))}
                            </select>

                            <label htmlFor="category">Categoría: </label>
                            <select name="category" id="category" onChange={handleChange} value={info.category} disabled={info.regionS !==''} >
                                <option value="">--Elige una categoría</option>
                                {categories.map(item => (
                                    <option value={item.strCategory} key={item.strCategory} >{item.strCategory}</option>
                                ))}
                            </select>

                            <button type="submit" disabled={!validarState()}>Buscar</button>
                        </form>
                    </section>
                ) }

           </header>


        </>
    )
}
