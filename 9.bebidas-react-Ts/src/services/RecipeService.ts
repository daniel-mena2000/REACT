import axios from "axios";
import { CategoriesApiResponseSchema, DrinksSchemaArray } from "../utils/recipes-schema";
import type { SearchFilterType } from "../types";


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
