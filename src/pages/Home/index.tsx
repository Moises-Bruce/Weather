import { useState, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { TemperatureSwitch } from '../../components/TemperatureSwitch'
import { GeocoderAutocomplete, CityGeocoder } from '../../components/GeocoderAutocomplete'

import styles from './styles.module.css'

export function Home() {
  const [checkedTemperature, setCheckedTemperature] = useState<'F' | 'C'>('C')
  const [citySelected, setCitySelected] = useState<CityGeocoder>({} as CityGeocoder)

  const navigate = useNavigate()

  function handleChangeTypeTemperature(checked: boolean) {
    setCheckedTemperature(checked ? 'C' : 'F')
  }

  function handleSelectedCity(city: CityGeocoder) {
    console.log(city)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
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
        <h1 className={styles.title}>Como está o tempo hoje?</h1>

        <GeocoderAutocomplete
          onSelectedCity={handleSelectedCity}
        />
      </main>
    </div>
  )
}