import { useAppStore } from '../../stores/useAppStore'
import type { MealsRegionType } from '../../types'
import styles from './Card.module.css'

type CardType = {
    info: MealsRegionType
}

export function Card({info}: CardType) {

    const fetchRecipesMeals = useAppStore((state) => state.fetchRecipesMeals)

    return(
        <>
            <section className={styles.section} >

            {info.meals.map(item => (
                <div className={styles.cardInfo} key={item.idMeal}>
                    <h3>{item.strMeal}</h3>
                    <img width={200} src={item.strMealThumb} alt="" />
                    <button onClick={() => fetchRecipesMeals(item.idMeal)} >Ver receta</button>
                </div>

            ))}
            </section>
        </>
    )
}
