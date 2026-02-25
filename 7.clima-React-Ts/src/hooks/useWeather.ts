import axios from "axios";
import {z} from "zod";
import type { SearchType } from "../types";
import { useMemo, useState } from "react";

//Definimos nuestro esquema de zod
const WeatherSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

//"infer" lo que hara es inferir en base al esquema que le pasemos
//Eso hace que: Si cambias el schema - El tipo cambie automáticamente
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
//Ocultados ApiKey
            const appId = import.meta.env.VITE_API_KEY

            setLoading(true)
//Cada que hagamos un nuevo llamado reiniciamos los valores, en este caso nos sirve para que el spinner cuando cargue no se junten los componentes
            setWeather(initialState)
//Pasamos la info de nuestros inputs
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`

            const data = await axios.get(geoUrl)


//Condicion si es que no se encuentra la ciudad
            if (!data) {
                setNotFound(true)
                return
            }
//Imprime "data" para navegar y buscar lat y lon
            const lat = data.data.coord.lat
            const lon = data.data.coord.lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
//Como ya hicimos una variable "data" y axios aqui te pide nombrar la info como "data" la reasigamos con (:) con otro nombre.
//**Zod** es una librería para **validar datos y definir esquemas en TypeScript**.
            const {data: weatherResult} = await axios(weatherUrl)
//safeParse: Tomara el resultado de nuestra API "weatherResult" y va a revisar si esas propiedades que esta obteniendo correspoden al schema que yo defini, si es asi devolvera un "true" y "false" si es diferente a la peticion
            const result = WeatherSchema.safeParse(weatherResult)
            console.log(result);

//verificamos si result es success para setear la info, success viene de result como boolean
            if (!result.success) {
  console.log("Invalid API response")
      return

            }else{
//Recordar que aqui esta la info: "result.data" asi que la seteamos

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
//Funcion para verificar si el estado esta vacio, y si esta vacio mostrar en la interfaz un mensaje u el compoente en el caso de que ya tenga info
        const hasWeatherData = useMemo(() => weather.name ,[weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}
