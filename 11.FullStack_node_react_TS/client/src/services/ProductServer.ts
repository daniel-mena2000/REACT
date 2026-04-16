import { safeParse, transform, pipe, number, string, boolean } from "valibot";
import { DraftProductSchema, ProductListSchema, ProductSchema, type ProductType } from "../types";

type AddProductType = {
 [k: string]: FormDataEntryValue;
}

export async function addProduct(data: AddProductType) {
   try {
//Validamos con safeParse de valivot
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: Number(data.price)
        })
//Si lo que escribimos en el formulario coincide con DraftProductSchema es success
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
//Usamos fetch para usar el metodo POST hacia la "url" y le pasamos la informacion a enviar
            await fetch(url, {
                method: "POST",
                 headers: {
                    "Content-Type": "application/json",
                },
//recordar que los datos estan en result.output -> console.log(result);
                body: JSON.stringify({
                name: result.output.name,
                price: result.output.price,
            }),
                });
        }else{
            throw new Error("Datos no validos");

        }

   } catch (error) {
        console.log(error);

   }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`

        const data = await fetch(url).then(res => res.json())

        const result = safeParse(ProductListSchema, data.data)
        //console.log(result);

        if (result.success) {
            return result.output
        }else{
            throw new Error("Hubo un error");

        }


    } catch (error) {
        console.log(error);

    }
}


export async function getProductsById(id: ProductType['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`

        const data = await fetch(url).then(res => res.json())

        const result = safeParse(ProductSchema, data.data)
        //console.log(result);

        if (result.success) {
            return result.output
        }else{
            throw new Error("Hubo un error");

        }


    } catch (error) {
        console.log(error);

    }
}

//Para actualizar toma "data" que es lo que el usuario ingresa en el formualrio y el "id" de ese producto a actualizar
export async function updateProduct(data: AddProductType, id: ProductType['id']) {
//No le pasamos data directamente ya que este no tiene el id de los params, crearemos nosotros lo que espera el schema asiganado los valores en el objeto
   try {
//Como vimos los datos son strings y en el caso de precio y disponibilidad los datos son number y boolean, igualmente asi los espera el schema, por que lo en ves de usar number, en el caso de price para convertirlo, usaremos transform y pipe, para decir que de string() pasara ese valor a un number(), igual para el boolean.
//Antes se usaba "coerce" pero ya no acepta valibot.
        const numberSchema  = pipe(
        string(),
        transform((value) => Number(value)),
        number()
        );

        const booleanSchema = pipe(
        string(),
        transform((value) => value === "true"),
        boolean()
);
//Es necesario ingregar al output para entrar a los datos y poder asignarlos
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: safeParse(numberSchema , data.price).output,
            availability:  safeParse(booleanSchema, data.availability).output
        })

         if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            //await axios.put(url, result.output)
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(result.output),
                    });

                    if (!response.ok) {
                    throw new Error("Error en la petición");
                    }
                   }

   } catch (error) {
        console.log(error);

   }


}


export async function deleteProduct(id: ProductType['id']) {
    //console.log(id);
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        //await axios.delete(url)
        const response = await fetch(url, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Error al eliminar')
            }
    }


    export async function updateProductAvailability(id: ProductType['id']) {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await fetch(url, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json'
                }
                })
        } catch (error) {
            console.log(error);

        }
    }
