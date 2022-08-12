import { useState, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { TemperatureSwitch } from '../../components/TemperatureSwitch'

import styles from './styles.module.css'

export function Home() {
  const [checkedTemperature, setCheckedTemperature] = useState<'F' | 'C'>('C')

  const navigate = useNavigate()

  function handleChangeTypeTemperature(checked: boolean) {
    setCheckedTemperature(checked ? 'C' : 'F')
  }

  function handleSubmitSearch(event: KeyboardEvent<HTMLInputElement>) {
    if(event.key === 'Enter') {
      navigate('weather')
    }
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
        <input
          className={styles.search}
          type="text"
          placeholder="Digite o nome da cidade"
          onKeyDown={handleSubmitSearch}
        />
      </main>
    </div>
  )
}