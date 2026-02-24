import axios from "axios";
import type { SearchType } from "../types";


export function useWeather() {

    const fetchWeather = async (search: SearchType) => {
       try {
//Ocultados ApiKey
            const appId = import.meta.env.VITE_API_KEY
//Pasamos la info de nuestros inputs
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${appId}`

            const data = await axios.get(geoUrl)
//Imprime "data" para navegar y buscar lat y lon
            const lat = data.data.coord.lat
            const lon = data.data.coord.lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
//Como ya hicimos una variable "data" y axios aqui te pide nombrar la info como "data" la reasigamos con (:) con otro nombre
            const {data: weatherResult} = await axios(weatherUrl)
            console.log(weatherResult);


       } catch (error) {
            console.log(error);

       }

    }


    return {
        fetchWeather
    }
}
