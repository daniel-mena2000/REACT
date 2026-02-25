import type { WeatherType } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import styles from "./weaterDetail.module.css"

type WeaterDetailProps = {
    weather: WeatherType,

}


export function WeaterDetail({weather}: WeaterDetailProps) {
    return(
        <div className={styles.container}>
            <h2>Clima de: <span className={styles.cityName}>{weather.name}</span></h2>
            <p className={styles.current}>{formatTemperature(weather.main.temp)}°C</p>
            <div className={styles.temperatures}>
                <p>Min: <span>{formatTemperature(weather.main.temp_min)}°C</span></p>
                 <p>Max: <span>{formatTemperature(weather.main.temp_max)}°C</span></p>
            </div>
        </div>
    )
}
