import type { StateCreator } from "zustand";
import { getCategory, getFilterCategory, getFilterRegion, getRecipeMeals, getRegion } from "../services/MealsService";
import type { CategoryType, MealsRegionType, RecipeMealsType, RegionType } from "../types";


export type MealsSliceType = {
     region: RegionType
     categories: CategoryType
     fetchRegions: () => Promise<void>
     fetchCategories: () => Promise<void>
    fetchFilterRegion: (info: string) => Promise<void>
    regionFilter: MealsRegionType
    fetchFilterCategory: (category: string) => Promise<void>
    categoryFilter: MealsRegionType
    selectedRegion: string
    selectedCategory: string
    fetchRecipesMeals: (id: string) => Promise<void>
    modal: boolean,
    modalChange: (value: boolean) => void
    recipeMeals: RecipeMealsType
    loading: boolean
    error: string | null

}

export const createMealsSlice: StateCreator<MealsSliceType> = (set) => ({

    loading: false,
    error: null,
   region: [],
   categories: [],
   regionFilter: {
        meals: []
   },
   categoryFilter: {
    meals: []
   },
   selectedRegion: '',
   selectedCategory: '',

   recipeMeals: {
    idMeal: '',
    strMeal: '',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    strMealThumb: '',
    strYoutube: '',
    strIngredient1: '',
    strIngredient2: '',
    strIngredient3: '',
    strIngredient4: '',
    strIngredient5: '',
    strIngredient6: '',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strMeasure1: '',
    strMeasure2: '',
    strMeasure3: '',
    strMeasure4: '',
    strMeasure5: '',
    strMeasure6: '',
    strMeasure7: '',
    strMeasure8: '',
    strMeasure9: '',
    strMeasure10: ''
},
   modal: false,
//loading Indica: "Hay una petición en curso" //error Indica:Algo falló", se asignan los valores solo si entra en try o en catch

   fetchRegions: async () => {
  try {
    set({ loading: true, error: null })

    const data = await getRegion()

    set({
      region: data.meals,
      loading: false
    })
  } catch (error) {
    set({
      loading: false,
      error: "Error al cargar regiones"
    })
    console.error(error)
  }
},


 fetchCategories: async () => {
  try {
    set({ loading: true, error: null })

    const data = await getCategory()

    set({
      categories: data.meals,
      loading: false
    })

  } catch(error) {
    set({
      loading: false,
      error: "Error al cargar categorías"
    })
    console.error(error)
  }
},
//Importante reiniciar "categoryFilter: {meals: []}" en la llamada contraria ya que la condicion es que regionFilter.meals.length > 0, y si no queda vacia, no renderizara el componente contrario, ya que no estan en 0.
//Hago un nuevo estado para el texto del titulo, pasandole el texto de la API

   fetchFilterRegion: async (info) => {
  try {
    set({ loading: true, error: null })

    const data = await getFilterRegion(info)

    set({
      regionFilter: data,
      selectedRegion: info,
      categoryFilter: { meals: [] },
      loading: false
    })

  } catch(error) {
    set({
      loading: false,
      error: "Error al filtrar por región"
    })
    console.error(error)
  }
},

  fetchFilterCategory: async (category) => {
  try {
    set({ loading: true, error: null })

    const data = await getFilterCategory(category)

    set({
      categoryFilter: data,
      selectedCategory: category,
      regionFilter: { meals: [] },
      loading: false
    })

  } catch(error) {
    set({
      loading: false,
      error: "Error al filtrar por categoría"
    })
    console.error(error)
  }
},

fetchRecipesMeals: async (id) => {
    try {
    set({ loading: true, error: null })
   const recipeMeals = await getRecipeMeals(id)

  set({
    recipeMeals,
    modal: true,
    loading: false
  })
} catch(error) {
    set({
      loading: false,
      error: "Error al cargar la receta"
    })
    console.error(error)
  }
},

modalChange: (value) => {
    set({
        modal: value,

    })
},

})
