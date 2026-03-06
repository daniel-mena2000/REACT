import type { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService"

import type { CategoriesType, DrinksType, SearchFilterType } from "../types"

export type RecipeSliceType = {
    categories: CategoriesType
    fetchCategories: () => Promise<void>
    searchRecipes: (recipesInfo: SearchFilterType) => Promise<void>
    drinks: DrinksType
}

//`StateCreator` es un **tipo que describe cómo se crea un store o slice en Zustand**.
//"categories" viene primero como objet y dentro "drinks" como array en ese orden haremos ese state
export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
//Nuestro state de drink, recordar que la api: drink empieza como un array
    drinks: {
        drinks: []
    },

    fetchCategories: async () => {
        const categories = await getCategories()
        console.log(categories);
        set({
            categories
        })
    },

     searchRecipes: async (recipesInfo) => {

       const drinks = await getRecipes(recipesInfo)

       set({
            drinks: drinks
       })
    }
})
