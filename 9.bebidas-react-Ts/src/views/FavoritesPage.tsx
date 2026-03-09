import { DrinkCard } from "@/components/DrinkCard"
import { useAppStore } from "@/stores/useAppStore"

export function FavoritesPage() {
//Mandamos llamar nuestro state de favoritos, y retutilizaremos nuestro componente de DrinkCard para mostrar nuestros favoritos
    const favorites = useAppStore((state) => state.favorites)
    const hasFavorites = favorites.length

    return(
        <>
            <h1 className="text-6xl font-extrabold text-center">Favoritos</h1>

            <div className="flex items-center justify-center mt-10 gap-3">
            <div className="w-16 h-0.5 bg-emerald-500/40"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <div className="w-16 h-0.5 bg-emerald-500/40"></div>
            </div>

            {hasFavorites ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 my-10">
                {favorites.map(item => (
                    <DrinkCard
                        key={item.idDrink}
                        drink={item}
                    />
                ))}

            </div>
            ):
                (
                    <p className="my-10 text-center text-2xl">
                        Tus recetas favoritas se mostraran aquí.
                    </p>
                )
            }
        </>
    )
}
