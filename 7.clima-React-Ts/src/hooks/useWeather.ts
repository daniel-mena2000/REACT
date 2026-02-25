import axios from "axios";
import {z} from "zod";
import type { SearchType } from "../types";
import {useState } from "react";

//Definimos nuestro esquema de zod
const WeatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

export type WeatherType = z.infer<typeof WeatherSchema>

export function useWeather() {

    const initialState = {
           name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    }
    const [weather, setWeather] = useState<WeatherType>(initialState)

//Si el usuario da en buscar clima cambia a true mostrando el spiner carga
    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
       try {

            const appId = import.meta.env.VITE_API_KEY

            setLoading(true)
            setWeather(initialState)

            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`

            const data = await axios.get(geoUrl)


            if (!data) {
                setNotFound(true)
                return
            }
            const lat = data.data.coord.lat
            const lon = data.data.coord.lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const {data: weatherResult} = await axios(weatherUrl)
            const result = WeatherSchema.safeParse(weatherResult)
            console.log(result);

            if (!result.success) {
                console.log("Invalid API response")
                return

            }else{
                    setWeather(result.data)
                    setNotFound(false)

            }

       } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                setNotFound(true)
            }
        }

    console.log(error)

       }finally{
//El finally independientemente si se ejecuta try o catch este se ejecutara
        setLoading(false)
       }

    }
//hasWeatherData será true si weather.name NO es una cadena vacía

        const hasWeatherData = weather.name !== ''

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}
