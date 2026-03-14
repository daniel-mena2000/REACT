import type { MealsStrRegionType, RecipeMealsType } from "../types"
import { RegionsSchema, MealsRegionArrayFilterSchema, RecipeMealsSchema, RecipeMealsResponseSchema } from "../utils/meals-schema"
import { CategorySchema } from "../utils/meals-schema"
import { fetchAndValidate } from "../helpers/apiCliente"

export async function getRegion() {
        return fetchAndValidate('https://www.themealdb.com/api/json/v1/1/list.php?a=list', RegionsSchema )

}

export async function getCategory() {
    return fetchAndValidate('https://www.themealdb.com/api/json/v1/1/list.php?c=list', CategorySchema)

}

export async function getFilterRegion(info: MealsStrRegionType['strMeal']) {

    return fetchAndValidate(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${info}`, MealsRegionArrayFilterSchema)

}

export async function getFilterCategory(category: MealsStrRegionType['strMeal']) {
    return fetchAndValidate(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, MealsRegionArrayFilterSchema)
}

export async function getRecipeMeals(id: RecipeMealsType['idMeal']) {


  const data = await fetchAndValidate(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    RecipeMealsResponseSchema
  )

  return data.meals[0]
}




