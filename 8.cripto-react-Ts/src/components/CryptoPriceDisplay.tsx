import { useCryptoStore } from "../store"
import Spinner from "./Spinner"

export function CryptoPriceDisplay() {

    const result = useCryptoStore((state) => state.result)
    const loading = useCryptoStore((state) => state.loading)

//Si los valores del nuestro state, son vacios no mostramos nada
    const hasResult = Object.values(result).includes('')

//Lo que nos manda la imagen es la media no la url completa ejemplo: /media/2332342/btc.png, y esta viene de la url de la API por lo tanto asi la colocamos para que la pueda mostrar
//Primero verificamos si loading es True y muestra el spiner, cuando cambie a false y vea que el resultado no esta vacio, muestra la info
    return(
        <div className="result-wrapper">

            {loading ? <Spinner/> : !hasResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="imagen cryptomoneda" />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span> </p>
                            <p>Precio más alto del día: <span>{result.HIGHDAY}</span> </p>
                            <p>Precio más bajo del día: <span>{result.LOWDAY}</span> </p>
                            <p>Variación últimas 24 Horas: <span>{result.CHANGEPCT24HOUR}</span> </p>
                            <p>Última Actualizacion: <span>{result.LASTUPDATE}</span> </p>
                         </div>
                    </div>
                </>
            )}

        </div>
    )
}
