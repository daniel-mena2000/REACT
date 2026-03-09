import z from "zod";
import { CategoriesApiResponseSchema, DrinksSchema, DrinksSchemaArray, InfoDrinksSchemaAPI, SearchFilterSchema } from "../utils/recipes-schema";

export type CategoriesType = z.infer<typeof CategoriesApiResponseSchema>

export type SearchFilterType = z.infer<typeof SearchFilterSchema>

export type DrinksType = z.infer<typeof DrinksSchemaArray>


export type DrinkCardType = z.infer<typeof DrinksSchema>


export type SelectRecipeInfoType = z.infer<typeof InfoDrinksSchemaAPI>
