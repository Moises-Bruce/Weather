import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TemperatureSwitch } from '../../components/TemperatureSwitch'
import { BackButton } from '../../components/BackButton'

import cloud from '../../assets/cloud.svg'
import styles from './styles.module.css'

type ParamsRoute = {
  lon: string;
  lat: string;
  temperature: 'F' | 'C';
}

const API_KEY = '1447b5a6a99dd5f2157fe98e75ddaccb'

export function WeatherInfo() {
  const [checkedTemperature, setCheckedTemperature] = useState<'F' | 'C'>('C');

  const navigate = useNavigate()
  const { lon, lat, temperature } = useParams<ParamsRoute>()

  function handleChangeTypeTemperature(checked: boolean) {
    setCheckedTemperature(checked ? 'C' : 'F')
  }

  async function requestWeatherInformation() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=${API_KEY}`)
    const data = await response.json()

    console.log(data)
  }

  useEffect(() => {
    setCheckedTemperature(temperature || 'C')
    requestWeatherInformation()
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>
          <BackButton
            onClick={() => navigate(-1)}
          />
        </span>

        <div className={styles.switcher}>
          <span>ºF</span>
          <TemperatureSwitch
            checked={checkedTemperature === 'C'}
            onChange={handleChangeTypeTemperature}
          />
          <span>ºC</span>
        </div>
      </header>

      <main className={styles.content}>
        <h1 className={styles.title}>BELO HORIZONTE</h1>
        <p className={styles.subTitle}>Nuvens dispersas</p>

        <section className={styles.result}>
          <span>29º</span>
          <img src={cloud} />
        </section>

        <section className={styles.info}>
          <div>
            <strong>MAX:</strong>
            <span>29º</span>
          </div>

          <div>
            <strong>MIN:</strong>
            <span>14º</span>
          </div>
        </section>

        <button className={styles.details}>
          Ver previsão para os próximos 5 dias
        </button>
      </main>
    </div>
  )
}