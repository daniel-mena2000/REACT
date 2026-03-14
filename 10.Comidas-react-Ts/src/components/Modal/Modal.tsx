import styles from "./Modal.module.css"
import * as Dialog from "@radix-ui/react-dialog"
import { useAppStore } from "../../stores/useAppStore"
import type { JSX } from "react"
import type { RecipeMealsType } from "../../types"
import { Play, Bookmark, BookmarkX   } from "lucide-react"


export function RecipeModal() {

    const modalChange = useAppStore((state) => state.modalChange)
    const modal = useAppStore((state) => state.modal)
    const recipeMeals = useAppStore((state) => state.recipeMeals)
    const handleClickSave = useAppStore((state) => state.handleClickSave)
    const favoriteExist = useAppStore((state) => state.favoriteExist)



    const renderIngredients = () => {
            const ingredients : JSX.Element[] = []

            for (let index = 1; index < 10; index++) {
                const ingredient = recipeMeals[`strIngredient${index}` as keyof RecipeMealsType]  ;
                const measure = recipeMeals[`strMeasure${index}` as keyof RecipeMealsType]

                if (ingredient && measure) {
                    ingredients.push(
                        <li key={index}>
                            {ingredient} - {measure}
                        </li>
                    )
                }
            }

            return  ingredients

    }


  return (
   <Dialog.Root open={modal} onOpenChange={modalChange}>
  <Dialog.Portal>

    <Dialog.Overlay className={styles.overlay} />

    <Dialog.Content className={styles.modal}>

      <section className={styles.info_uno}>

        <header>
          <Dialog.Title className={styles.title}>
            {recipeMeals.strMeal}
          </Dialog.Title>

          <figure>
            <img
              src={recipeMeals.strMealThumb}
              alt={recipeMeals.strMeal}
              className={styles.image}
            />
          </figure>

          <div className={styles.infoMeal}>
            <p>
              País: <span>{recipeMeals.strArea}</span> — Categoría:{" "}
              <span>{recipeMeals.strCategory}</span>
            </p>
          </div>
        </header>

        <section>
          <h3>Ingredientes</h3>

          <ul>
            {renderIngredients()}
          </ul>
        </section>
      </section>

      <section>
        <h3>Instrucciones</h3>

        <Dialog.Description>
          {recipeMeals.strInstructions}
        </Dialog.Description>
      </section>



      <footer className={styles.actions}>
        {recipeMeals.strYoutube && (
          <a
            href={recipeMeals.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.videoLink}
          >
            <Play size={18} />
            Ver video
          </a>
        )}
        <button className={styles.saveButton}
            onClick={() => {

                handleClickSave(recipeMeals)
                modalChange(false)
            }
            }

        >
            { favoriteExist(recipeMeals.idMeal) ?
             (
                <>
                 <BookmarkX   size={18} />
                Eliminar receta
                </>
             )
             :
                (
                    <>
                    <Bookmark size={18} />
                    Guardar receta

                    </>
                )
        }

        </button>
      </footer>

    </Dialog.Content>

  </Dialog.Portal>
</Dialog.Root>
  )
}
