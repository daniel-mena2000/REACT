import { Card } from '../components/Card/Card'
import { useAppStore } from '../stores/useAppStore'
import styles from './IndexPage.module.css'

export function IndexPage() {
    const regionFilter = useAppStore((state) => state.regionFilter)
    const categoryFilter = useAppStore((state) => state.categoryFilter)
    const selectedCategory = useAppStore((state) => state.selectedCategory)
    const selectedRegion = useAppStore((state) => state.selectedRegion)

      const noResults = regionFilter.meals.length === 0 && categoryFilter.meals.length === 0

  if (noResults) {
    return <h2 className={styles.empty_title}>Nada para mostrar aún 😔 </h2>
  }


//Importante reiniciar "categoryFilter: {meals: []}" en la llamada contraria ya que la condicion es que regionFilter.meals.length > 0, y si no queda vacia, no renderizara el componente contrario, ya que no estan en 0.
    return(

      <>
        {regionFilter.meals.length > 0 && (
        <>
          <p className={styles.index_page_title}>Resultados por la región de: <span>{selectedRegion}</span> </p>
          <Card info={regionFilter} />
        </>
      )}

      {categoryFilter.meals.length > 0 && (
        <>
          <p  className={styles.index_page_title}>Resultados por la categoría: <span>{selectedCategory}</span></p>
          <Card info={categoryFilter} />
        </>
      )}


      </>
    )
}
