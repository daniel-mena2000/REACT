import axios from 'axios'
import { CryptoCurrenciesResponseSchema, CryptoInfoSchema } from '../schema/crypto-schema'
import type { PairType } from '../types'


export async function getCryptos() {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

//Extraemos solo la data de data de axios
    const {data: { Data }} = await axios(url)
    //console.log(Data);
//Recordar que safeParse revisara la respuesta "Data" sea exacatmente del tipo de nuestro schema ya que ahi Ts ya no puede
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
 //   console.log(result); Comprobamos que el success sera True para poder mandar llamar la data
    if (result.success) {
        return result.data
    }
}

//Como los datos en la API son dinamicos es decir para entrar a los datos dependera de la moneda y el tipo de bitcoin, entraremos primero a DISPLAY, de ahi podemos ver que sigue el tipo de CRIPTO, y luego la MONEDA, en ese orden entraremos dinamicamente para poder entrar a la info
export async function fetchCurrentCryptoPrice(pair: PairType) {

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`

    const {data: { DISPLAY }} = await axios.get(url)
    //console.log(DISPLAY[pair.criptocurrency][pair.currency]);

    const result = CryptoInfoSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
    //console.log(result);
    if (result.success) {
        return result.data

    }

}
