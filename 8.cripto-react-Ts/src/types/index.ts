import z from "zod"
import { CryptoInfoSchema, CurrencySchema, PairSchema} from "../schema/crypto-schema"
import { CryptoCurrencyResponseSchema } from "../schema/crypto-schema"

export type CurrencyType = z.infer<typeof CurrencySchema>

export type CryptoCurrencyType = z.infer<typeof CryptoCurrencyResponseSchema>

export type PairType = z.infer<typeof PairSchema>

export type CryptoInfoType = z.infer<typeof CryptoInfoSchema>
