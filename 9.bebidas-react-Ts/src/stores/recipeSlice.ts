import type { StateCreator } from "zustand"
import { getCategories, getInfoRecipesById, getRecipes } from "../services/RecipeService"


import type { CategoriesType, DrinkCardType, DrinksType, SearchFilterType, SelectRecipeInfoType } from "../types"

export type RecipeSliceType = {
    categories: CategoriesType
    fetchCategories: () => Promise<void>
    searchRecipes: (recipesInfo: SearchFilterType) => Promise<void>
    drinks: DrinksType
    selectRecipe: (id: DrinkCardType['idDrink']) => Promise<void>
    selectRecipeInfo: SelectRecipeInfoType,
    modal:boolean
    modalChange: (value: boolean) => void
}


export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
   selectRecipeInfo: {
    idDrink: '',
    strDrink: '',
    strDrinkThumb: '',
    strInstructions: '',
    strIngredient1: '',
    strIngredient2: '',
    strIngredient3: '',
    strIngredient4: '',
    strIngredient5: '',
    strIngredient6: '',
    strMeasure1: '',
    strMeasure2: '',
    strMeasure3: '',
    strMeasure4: '',
    strMeasure5: '',
    strMeasure6: ''
} ,
modal: false,

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
    },
    selectRecipe: async (id) => {
       const selectRecipeInfo =  await getInfoRecipesById(id)
        set({
            selectRecipeInfo,
            modal: true

        })
    },
    modalChange: (value) => {
        set({
            modal: value,
            selectRecipeInfo: {} as SelectRecipeInfoType
        })
    }
})
