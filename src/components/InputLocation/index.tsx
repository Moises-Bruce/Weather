import { ChangeEvent, useState } from 'react'

import styles from './styles.module.css'

const API_KEY = '426a111886704c1ea0844015b466ed28'
const LIMIT = 5

export interface Place {
  id: string;
  lat: number;
  lon: number;
  city: string;
  state: string;
  country: string;
}

interface Props {
  onSubmit: (location: Place) => void
}

export function InputLocation({
  onSubmit
}: Props) {
  const [value, setValue] = useState('')
  const [places, setPlaces] = useState<Place[]>([])

  async function handleOnChangeText(event: ChangeEvent<HTMLInputElement>) {
    const currentValue = String(event.target.value)
    setValue(currentValue)

    if (currentValue.trim().length >= 3) {
      const currentPlaces = await requestLocations(currentValue)

      setPlaces(currentPlaces)
    } else {
      setPlaces([])
    }
  }

  function handleSubmitByPlace(place: Place) {
    setValue(place.city)
    onSubmit(place)
  }

  async function requestLocations(name: string): Promise<Place[]> {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(name)}&limit=${LIMIT}&lang=pt&apiKey=${API_KEY}`)
    const data = await response.json()

    const requestedPlaces: Place[] = []

    data.features.forEach((item: any) => {
      const { place_id, lat, lon, city, state, country } = item.properties

      if (city) {
        requestedPlaces.push({
          id: place_id,
          lat,
          lon,
          city,
          state,
          country
        })
      }
    })

    return requestedPlaces
  }

  return (
    <div className={styles.areaInput}>
      <input
        type="text"
        value={value}
        className={styles.input}
        onChange={handleOnChangeText}
        placeholder='Digite o nome da cidade'
      />

      {
        places.length > 0 && (
          <ul className={styles.optionContainer}>
            {
              places.map(place => (
                <li
                  key={place.id}
                  className={styles.option}
                  onClick={() => handleSubmitByPlace(place)}
                >
                  {place.city} - {place.state} ({place.country})
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}