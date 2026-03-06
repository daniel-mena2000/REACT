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

//Eschema para la la info que necesitemos en la card
//nullable(), Significa que ese valor puede o no existir, ya que por ejemplo una receta puede varias el numero de ingredientes
//Esta vez en vez de crear el schema de array y dentro el schema de objeto, accederemos en el archivo de service, con: InfoDrinksSchemaAPI.safeParse(data.drinks[0]) accediendo a la primera posicion de la info, esa es otra forma.
export const InfoDrinksSchemaAPI = z.object({
    idDrink: z.string(),
  strDrink: z.string(),
  strDrinkThumb: z.string(),
  strInstructions: z.string(),
  strIngredient1: z.string().nullable(),
  strIngredient2: z.string().nullable(),
  strIngredient3: z.string().nullable(),
  strIngredient4: z.string().nullable(),
  strIngredient5: z.string().nullable(),
  strIngredient6: z.string().nullable(),
  strMeasure1: z.string().nullable(),
  strMeasure2: z.string().nullable(),
  strMeasure3: z.string().nullable(),
  strMeasure4: z.string().nullable(),
  strMeasure5: z.string().nullable(),
  strMeasure6: z.string().nullable(),

})
