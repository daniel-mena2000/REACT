import { useAppStore } from '../stores/useAppStore'
import { CardFavorites } from '../components/CardFavorites/CardFavorites'
import styles from './Favorites.module.css'

export function FavoritesPage() {

    const favorites = useAppStore((state) => state.favorites)
    const hasFavorites = favorites.length > 0

    return(
        <>
           <section className={styles.sectionFav}>
                <h1 className={styles.titleFav} >Recetas Guardadas 😋</h1>

                {hasFavorites ? (
                <div className={styles.container_favorites}>
                    {favorites.map(item => (
                        <CardFavorites key={item.idMeal} item={item} />
                    ))}
                </div>
                ) : (
                    <h2 className={styles.no_recipes}>-- No hay recetas para mostrar --</h2>
                )}

           </section>
        </>
    )
}
