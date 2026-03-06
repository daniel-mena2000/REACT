import axios from "axios";
import { CategoriesApiResponseSchema, DrinksSchemaArray, InfoDrinksSchemaAPI, InfoDrinksSchemaArray } from "../utils/recipes-schema";
import type { DrinkCardType, SearchFilterType } from "../types";
import { success } from "zod";


export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    const result = CategoriesApiResponseSchema.safeParse(data)

    if (result.success) {
        return result.data
    }
}


//Combinaremos los filtros, en este caso la primera url solo pide categoria, pero haremos "&i=" para agregar la opcion de pasarle igual un ingrediente
export async function getRecipes(recipesInfo: SearchFilterType) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${recipesInfo.category}&i=${recipesInfo.ingredient}`
    const {data} = await axios(url)

    const result = DrinksSchemaArray.safeParse(data)
    if (result.success) {
        return result.data

    }

}

export async function getInfoRecipesById(id: DrinkCardType['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

    const {data} = await axios(url)

    const result = InfoDrinksSchemaAPI.safeParse(data.drinks[0])

    if (result.success) {
        return result.data

    }

}
