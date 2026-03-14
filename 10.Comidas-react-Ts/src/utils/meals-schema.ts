import { z } from "zod";

export const RegionsSchema = z.object({
    meals: z.array(
        z.object({
            strArea: z.string()
        })
    )
})

export const CategorySchema = z.object({
    meals: z.array(z.object({
        strCategory: z.string()
    }))
})


export const MealsRegionFilterSchema = z.object({
        strMeal: z.string(),
        strMealThumb: z.string(),
        idMeal: z.string()
})



export const MealsRegionArrayFilterSchema = z.object({
    meals: z.array(MealsRegionFilterSchema)
})


export const RecipeMealsSchema = z.object({
idMeal: z.string(),
strMeal: z.string(),
strCategory: z.string(),
strArea:z.string() ,
strInstructions: z.string(),
strMealThumb: z.string(),
strYoutube: z.string().nullable(),
strIngredient1:z.string().nullable(),
strIngredient2: z.string().nullable(),
strIngredient3:z.string().nullable() ,
strIngredient4:z.string().nullable() ,
strIngredient5:z.string().nullable() ,
strIngredient6:z.string().nullable() ,
strIngredient7:z.string().nullable() ,
strIngredient8:z.string().nullable(),
strIngredient9: z.string().nullable(),
strIngredient10: z.string().nullable(),
strMeasure1: z.string().nullable(),
strMeasure2: z.string().nullable(),
strMeasure3: z.string().nullable(),
strMeasure4: z.string().nullable(),
strMeasure5: z.string().nullable(),
strMeasure6: z.string().nullable(),
strMeasure7: z.string().nullable(),
strMeasure8: z.string().nullable(),
strMeasure9: z.string().nullable(),
strMeasure10: z.string().nullable(),
})

//Shema para recibir el id, en MealsService
export const RecipeMealsResponseSchema = z.object({
  meals: z.array(RecipeMealsSchema)
})
