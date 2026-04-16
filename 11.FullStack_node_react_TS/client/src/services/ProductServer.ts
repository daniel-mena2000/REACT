import { safeParse } from "valibot";
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
    console.log(data);
    console.log(id);


}
