import { useAppStore } from '../../stores/useAppStore'
import type { RecipeMealsType } from '../../types'
import styles from './CardFavorites.module.css'

type CardFavoritesType = {
    item: RecipeMealsType
}

export function CardFavorites({ item }: CardFavoritesType) {

    const fetchRecipesMeals = useAppStore((state) => state.fetchRecipesMeals)
    const handleClickSave = useAppStore((state) => state.handleClickSave)

    return (
        <div className={styles.cardInfo}>
            <h3>{item.strMeal}</h3>
            <img width={200} src={item.strMealThumb} alt={item.strMeal} />
            <div className={styles.buttons}>
                <button className={styles.btnRecipe} onClick={() => fetchRecipesMeals(item.idMeal)}>
                    Ver receta
                </button>
                <button className={styles.btnDelete} onClick={() => handleClickSave(item)}>
                    Eliminar
                </button>
            </div>
        </div>
    )
}
