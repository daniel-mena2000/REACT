import type { DrinkCardType } from "../types"
import { useAppStore } from "../stores/useAppStore"

type DrinkCardProps = {
    drink: DrinkCardType
}

export function DrinkCard({ drink }: DrinkCardProps) {

    const selectRecipe = useAppStore((state) => state.selectRecipe)

  return (
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg shadow-black/40 border border-white/5 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 md:m-2">

      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5 space-y-4">
        <h2 className="text-xl font-bold text-white truncate">
          {drink.strDrink}
        </h2>

        <button
          type="button"
          className="w-full py-2 rounded-xl
          bg-linear-to-r from-emerald-700 to-emerald-800
          hover:from-emerald-600 hover:to-emerald-700
          text-white font-semibold
          transition-all duration-300
          shadow-md shadow-emerald-900/40
          hover:shadow-emerald-700/40"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          Ver receta
        </button>
      </div>

    </div>
  )
}
