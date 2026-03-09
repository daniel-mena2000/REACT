import { useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import {toast}  from 'react-toastify'


export function Header() {

    const location = useLocation()
//Podemos destrucuturar igualmente en este caso si solo queremos "pathname"  const {pathname} = useLocation()
//Funcion que nos permite saber si estamos en el home dara un booleano
    const isHome = useMemo(() => location.pathname === '/' ,[location.pathname])
    //console.log(isHome);

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)



    useEffect(() => {
        fetchCategories()
    },[])

    const [recipesInfo, setRecipesInfo] = useState({
        ingredient: '',
        category: ''
    })


    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setRecipesInfo({
            ...recipesInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validar = Object.values(recipesInfo).includes('')

        if (validar) {
            toast.warning('Rellene los campos')
            return
        }

        searchRecipes(recipesInfo)

        setRecipesInfo({
        ingredient: '',
        category: ''
        })
    }

//Si estamos en inicio mostramos la imagen, y en favoritos solo el color de fondo
    return(
      <header className={isHome ? "relative min-h-screen bg-[url('/bebidas.png')] bg-cover bg-center flex flex-col" : "relative bg-cover bg-[url('/bebidas2.png')] bg-center flex flex-col"}>

  <div className="absolute inset-0 bg-black/70"></div>
    <div className="relative mx-auto container px-5 py-10 flex flex-col flex-1">


        <div className="flex justify-between items-center">

      <img
        className="w-72 drop-shadow-lg"
        src="/logobebidas.png"
        alt="logotipo"
      />

      <nav className="flex gap-6 text-sm tracking-wider">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-400 font-semibold uppercase"
              : "text-gray-300 hover:text-white transition uppercase"
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-400 font-semibold uppercase"
              : "text-gray-300 hover:text-white transition uppercase"
          }
        >
          Favoritos
        </NavLink>
      </nav>
    </div>

    {isHome && (
      <div className="flex flex-1 flex-col items-center justify-center text-center animate-fade-in">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Encuentra tu <span className="text-emerald-400">cocktail perfecto</span>
        </h1>

        <p className="text-gray-400 max-w-xl mb-10">
          Busca por ingrediente o categoría y descubre nuevas recetas
          para sorprender en cualquier ocasión.
        </p>

        <form onSubmit={handleSubmit}
          className="md:w-1/2 2xl:w-1/3
          bg-white/5 backdrop-blur-xl
          p-10
          rounded-3xl
          shadow-2xl shadow-black/60
          space-y-8
          border border-white/10
          transition-all duration-500"
        >
          <div className="space-y-3 text-left">
            <label
              htmlFor="ingredient"
              className="block text-gray-300 uppercase tracking-wider font-semibold text-sm"
            >
              Nombre o Ingrediente
            </label>

            <input
              id="ingredient"
              name="ingredient"
              type="text"
              placeholder="Ej. Vodka, Tequila, Café"
              className="w-full p-3 rounded-xl
              bg-black/40 text-white
              border border-white/10
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500/50
              focus:border-emerald-500
              transition-all duration-300"
              onChange={handleOnchange}
              value={recipesInfo.ingredient}
            />
          </div>

          <div className="space-y-3 text-left">
            <label
              htmlFor="category"
              className="block text-gray-300 uppercase tracking-wider font-semibold text-sm"
            >
              Categoría
            </label>

            <select
              id="category"
              name="category"
              className="w-full p-3 rounded-xl
              bg-black/40 text-white
              border border-white/10
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500/50
              focus:border-emerald-500
              transition-all duration-300"
              onChange={handleOnchange}
              value={recipesInfo.category}
            >
              <option className="bg-emerald-950" value="">-- Seleccione --</option>
             {categories.drinks.map(item => (
                <option className="bg-emerald-800" value={item.strCategory} key={item.strCategory}>
                    {item.strCategory}
                </option>
             ) )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl
            bg-linear-to-r from-emerald-600 to-emerald-800
            hover:from-emerald-500 hover:to-emerald-700
            text-white font-bold uppercase tracking-wide
            transition-all duration-300
            shadow-lg shadow-emerald-900/40
            hover:shadow-emerald-600/40
            active:scale-[0.97]"
          >
            Buscar Recetas
          </button>
        </form>
      </div>
    )}

  </div>
</header>
    )
}
