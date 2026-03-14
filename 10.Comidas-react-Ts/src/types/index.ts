import z from "zod"
import { CategorySchema, RegionsSchema, MealsRegionFilterSchema, MealsRegionArrayFilterSchema, RecipeMealsSchema } from "../utils/meals-schema"


export type RegionType = z.infer<typeof RegionsSchema>["meals"]
export type CategoryType = z.infer<typeof CategorySchema>["meals"]
export type MealsRegionType = z.infer<typeof MealsRegionArrayFilterSchema>
export type MealsStrRegionType = z.infer<typeof MealsRegionFilterSchema>
export type RecipeMealsType = z.infer<typeof RecipeMealsSchema>
