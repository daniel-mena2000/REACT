import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import { DrinkCard } from "../components/DrinkCard"
export function IndexPage() {

    const drinks = useAppStore((state) => state.drinks)

//Verificamos si temos drinks
    const hasDrinks = useMemo(() => drinks.drinks.length > 0 ,[drinks])
    return(
        <>
        <h1 className="text-center text-3xl md:text-4xl font-black     ">
            Descubre tu próxima bebida favorita
        </h1>

<div className="flex items-center justify-center mt-10 gap-3">
  <div className="w-16 h-0.5 bg-emerald-500/40"></div>
  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
  <div className="w-16 h-0.5 bg-emerald-500/40"></div>
</div>

    {hasDrinks ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 my-10">
                {drinks.drinks.map(item => (
                    <DrinkCard
                    key={item.idDrink}
                    drink={item}
                    />
                ))}
            </div>
         ) : (
            <p className="my-10 text-center text-2xl">No hay resultados aún, utiliza el formulario para buscar recetas</p>

         ) }
        </>
    )
}
