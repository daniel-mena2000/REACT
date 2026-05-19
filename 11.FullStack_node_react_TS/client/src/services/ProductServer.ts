import { safeParse, transform, pipe, number, string, boolean } from "valibot";
import { DraftProductSchema, ProductListSchema, ProductSchema, type ProductType } from "../types";

type AddProductType = {
 [k: string]: FormDataEntryValue;
}

export async function addProduct(data: AddProductType) {
   try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: Number(data.price)
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await fetch(url, {
                method: "POST",
                 headers: {
                    "Content-Type": "application/json",
                },
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

export async function updateProduct(data: AddProductType, id: ProductType['id']) {
   try {
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
