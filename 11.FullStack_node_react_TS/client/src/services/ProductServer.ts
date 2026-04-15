import { safeParse } from "valibot";
import { DraftProductSchema } from "../types";

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
            
        }else{
            throw new Error("Datos no validos");

        }

   } catch (error) {
        console.log(error);

   }

}
