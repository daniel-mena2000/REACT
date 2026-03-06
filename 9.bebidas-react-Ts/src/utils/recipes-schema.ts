import z from 'zod'

//En nuestra API Primero nos dice que dentro del objeto viene "drinks" que es un array, y dentro un objeto que conntiene strCategory que son string, en ese orden ira nuestro schema
export const CategoriesApiResponseSchema = z.object({
    drinks: z.array(z.object({
        strCategory: z.string()
    })),
})

export const SearchFilterSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})

//En este caso haremos 2 schemas uno el array de drinks que contiene a los objetos con la info
export const DrinksSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
})

export const DrinksSchemaArray = z.object({
    drinks: z.array(DrinksSchema)
})
