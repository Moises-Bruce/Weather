import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TemperatureSwitch } from '../../components/TemperatureSwitch'
import { BackButton } from '../../components/BackButton'

import cloud from '../../assets/cloud.svg'
import styles from './styles.module.css'

type ParamsRoute = {
  city: string
  lon: string;
  lat: string;
  temperature: 'F' | 'C';
}

interface IWeather {
  temp: number;
  tempMax: number;
  tempMin: number;
  state: string;
  icon: string;
}

const API_KEY = '55fcf576a4cfafa329603f1399bd38cd'

export function WeatherInfo() {
  const [checkedTemperature, setCheckedTemperature] = useState<'F' | 'C'>('C');
  const [weather, setWeather] = useState<IWeather>({} as IWeather)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const { city, lon, lat, temperature } = useParams<ParamsRoute>()

  function kelvinToCelsius(value: number) {
    const kelvin = value
    const celsius = kelvin - 273.15

    return celsius.toFixed(2)
  }

  function kelvinToFahrenheit(value: number) {
    const kelvin = value
    const fahrenheit = (kelvin - 273.15) * 1.8 + 32

    return fahrenheit.toFixed(2)
  }

  function handleChangeTypeTemperature(checked: boolean) {
    setCheckedTemperature(checked ? 'C' : 'F')
  }

  async function requestWeatherInformation() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=${API_KEY}`)
    const data = await response.json()

    setWeather({
      temp: data.main.temp,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      state: data.weather[0].description,
      icon: data.weather[0].icon
    })

    setIsLoading(false)
  }

  useEffect(() => {
    setCheckedTemperature(temperature || 'C')
    requestWeatherInformation()
  }, [])

  if(isLoading) {
    return (
      <div className={styles.container}>Carregando</div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>
          <BackButton
            onClick={() => navigate(-1)}
          />
        </span>

        <div className={styles.switcher}>
          <span>??F</span>
          <TemperatureSwitch
            checked={checkedTemperature === 'C'}
            onChange={handleChangeTypeTemperature}
          />
          <span>??C</span>
        </div>
      </header>

      <main className={styles.content}>
        <h1 className={styles.title}>{city?.toUpperCase()}</h1>
        <p className={styles.subTitle}>{weather.state}</p>

        <section className={styles.result}>
          <span>{checkedTemperature === 'C' ? `${kelvinToCelsius(weather.temp)}??` : `${kelvinToFahrenheit(weather.temp)}??F`}</span>
          <img style={{ width: 90 }} src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
        </section>

        <section className={styles.info}>
          <div>
            <strong>MAX:</strong>
            <span>{checkedTemperature === 'C' ? `${kelvinToCelsius(weather.tempMax)}??` : `${kelvinToFahrenheit(weather.tempMax)}??F`}</span>
          </div>

          <div>
            <strong>MIN:</strong>
            <span>{checkedTemperature === 'C' ? `${kelvinToCelsius(weather.tempMin)}??` : `${kelvinToFahrenheit(weather.tempMin)}??F`}</span>
          </div>
        </section>

        {/* <button className={styles.details}>
          Ver previs??o para os pr??ximos 5 dias
        </button> */}
      </main>
    </div>
  )
}