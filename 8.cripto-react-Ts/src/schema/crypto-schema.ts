import z from "zod";

//Podriamos tener estos junto a los types pero en este caso sera separado
export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string()
})


//Lo que esperamos de nuestra Respuesta de nuestra Api, y de "CoinInfo" necesitamos el "FullName" y el "Name" solo eso necesitamos a la hora de elegir en el select de nuestro formulario, como la respuesta espera un Array en este caso de 20 objetos y dentro estan los objetos, pues en ese orden iran, pero en este caso colocaremos por aparte el array y dentro el schema de los objetos
//Ejemplo todo junto:
/*export const CryptoCurrencyResponseSchema = z.array (z.object({
    CoinInfo: z.object({
        FullName: z.string(),
        Name: z.string()
    })
}))*/

export const CryptoCurrencyResponseSchema = z.object({
    CoinInfo: z.object({
        FullName: z.string(),
        Name: z.string()
    })
})
//Tambien para que sea de una forma mas reutilizable podemos quitar en el de arriba el "z.array" y crearlo aparte envolviendo el objeto.
export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema)


//Esquema para el estado de nuestros inputs del Form
export const PairSchema = z.object({
    currency: z.string(),
    criptocurrency: z.string()
})


export const CryptoInfoSchema = z.object({
    IMAGEURL: z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string()
})
