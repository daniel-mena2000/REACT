import axios from 'axios'
import { CryptoCurrenciesResponseSchema, CryptoInfoSchema } from '../schema/crypto-schema'
import type { PairType } from '../types'


export async function getCryptos() {
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

//Extraemos solo la data de data de axios
    const {data: { Data }} = await axios(url)

    const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    if (result.success) {
        return result.data
    }
}

export async function fetchCurrentCryptoPrice(pair: PairType) {

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`

    const {data: { DISPLAY }} = await axios.get(url)

    const result = CryptoInfoSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
    if (result.success) {
        return result.data

    }

}
