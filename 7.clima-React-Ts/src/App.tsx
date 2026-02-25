import styles from "./App.module.css"
import { Form } from "./components/Form/Form"
import { WeaterDetail } from "./components/WeatherDetail/WeaterDetail"
import { useWeather } from "./hooks/useWeather"
import { Spinner } from "./components/Spinner/Spinner"
import { Alert } from "./components/Alert/Alert"

function App() {

    const {fetchWeather, weather, loading,notFound, hasWeatherData} = useWeather()

  return (
    <>
        <h1 className={styles.title}>Buscador de Clima</h1>
        <div className={styles.container}>
            <Form fetchWeather={fetchWeather} />

        {loading && <Spinner/> }
        {hasWeatherData &&
            <WeaterDetail weather={weather} />
        }
        {notFound && <Alert>{'Ciudad no encontrada'}</Alert>}
        </div>
    </>
  )
}

export default App
