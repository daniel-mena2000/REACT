import z from "zod";
import { CategoriesApiResponseSchema, DrinksSchemaArray, SearchFilterSchema } from "../utils/recipes-schema";

export type CategoriesType = z.infer<typeof CategoriesApiResponseSchema>

export type SearchFilterType = z.infer<typeof SearchFilterSchema>

export type DrinksType = z.infer<typeof DrinksSchemaArray>
