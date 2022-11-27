import axios from "axios"
import { useEffect, useState } from "react"

const CardWeather = () => {
    const [coords, setCoords] = useState()
    const [weather, setWeather] = useState()
    const [temp, setTemp] = useState()
    const [changeTemp, setChangeTemp] = useState(true)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }, [])

    //console.log(coords.longitude)
    useEffect(() => {
        if (coords) {
            const apiKey = '8870d8f94dc9e4724ae93aec51f84bd3'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`
            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    setTemp({
                        celsius: Math.floor(res.data.main.temp - 273.15),
                        fahrenheit: Math.floor(((res.data.main.temp - 273.15) * 9 / 5) + 32)
                    })
                })
                .catch(err => console.log(err))

        }
    }, [coords])

    const handleClick = () => {
        setChangeTemp(!changeTemp)
    }

    return (
        <article className="cardWheather">
            <h1 className="cardWheather-title">Weather App</h1>
            <p className="cardWheather-City">{weather?.name}, {weather?.sys.country}</p>
            <div className="cardWheather-infoMain">
                <div className="cardWheather-infoMain-div">
                    <img className="cardWheather-infoMain-iconWeather" src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
                    {changeTemp
                        ? <p className="cardWheather-infoMain-degrees">{temp?.celsius} Cº </p>
                        : <p className="cardWheather-infoMain-degrees">{temp?.fahrenheit} Fº </p>}
                </div>
                <div>
                    <h2 className="cardWheather-infoMain-subTitle">{weather?.weather[0].description}</h2>
                    <ul className="cardWheather-infoMain-subInfo">
                        <li className="cardWheather-infoMain-subInfo-speed"><b>Wind speed: </b>{weather?.wind.speed} m/s</li>
                        <li className="cardWheather-infoMain-subInfo-clouds"><b>Clouds: </b>{weather?.clouds.all} %</li>
                        <li className="cardWheather-infoMain-subInfo-pressures"><b>Pressure: </b>{weather?.main.pressure}</li>
                    </ul>
                </div>
            </div>
            <button className="cardWheather-btn" onClick={handleClick}><b>Degrees ºF/ºC</b></button>
        </article>
    )
}

export default CardWeather

