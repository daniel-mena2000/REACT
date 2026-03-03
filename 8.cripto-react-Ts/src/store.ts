import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrencyType, CryptoInfoType, PairType } from "./types";
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService";

type CryptoStore = {
    crytocurrencies: CryptoCurrencyType[]
    fetchCryptos: () => Promise<void>
    fetchData: (pair: PairType) => Promise<void>
    result: CryptoInfoType
    loading: boolean
}


//Es importante convertir las acciones en asyncronas ya que en este punto ya salimos del async await y es una funcion aparte, si no se quedara esperando la respuesta
export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
//crytocurrencies empieza vacio, pero se luego se llena con la respuesta
    crytocurrencies: [],
//el state de result le colocamos las propiedades que espera, para irse llenando
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    loading: false,

    fetchCryptos: async () => {
    const crytocurrencies = await getCryptos()

    set(() => ({
            crytocurrencies: crytocurrencies
        }))
    },

    fetchData: async (pair) => {
//Podemos tener varios set en este caso el primero es para cambiar a true el loading del spinner luego hace el llamado, trae la info y al final cuando ya tengamos respuesta, cambiamos el loading a false otra vez para que no se quede ahi el spinner
         set(() => ({
            loading: true
        }))

        const result = await fetchCurrentCryptoPrice(pair)
        //console.log(result);

        set(() => ({
            result,
            loading: false
        }))

    }


})))
