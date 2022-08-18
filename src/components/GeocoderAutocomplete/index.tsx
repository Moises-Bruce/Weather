import { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import './styles.css'

export interface CityGeocoder {
  city: string;
  lat: number;
  lon: number;
}

interface GeocoderAutocompleteProps {
  onSelectedCity: (city: CityGeocoder) => void
}

export function GeocoderAutocomplete({onSelectedCity}: GeocoderAutocompleteProps) {
  function onPlaceSelect(value: any) {
    console.log('onPlaceSelect', value)
    return value
  }

  function onSuggectionChange(value: any) {
    console.log('onSuggest Change', value)
    return {}
  }

  function onPreProcessHook(inputValue: string) {
    return inputValue
  }

  function onPostprocessHook(value: any) {
    if(value.properties){
      onSelectedCity({
        city: value.properties.city,
        lat: value.properties.lat,
        lon: value.properties.lon
      });
    }

    console.log('Post Process', value)

    return value.properties.city
  }

  function onSuggestionsFilter(suggestions: any[]) {
    const processedCities: string[] = []

    const filtered = suggestions.filter(value => {
      if (!value.properties.city || processedCities.indexOf(value.properties.city) >= 0) {
        return false
      } else {
        processedCities.push(value.properties.city)
        return true
      }
    })

    return filtered
  }

  return (
    <GeoapifyContext apiKey="426a111886704c1ea0844015b466ed28">
      <GeoapifyGeocoderAutocomplete
        placeholder="Como está o tempo hoje?"
        type="city"
        lang="pt"
        limit={4}
        skipIcons
        suggestionsFilter={onSuggestionsFilter}
        preprocessHook={onPreProcessHook}
        postprocessHook={onPostprocessHook}
        suggestionsChange={onSuggectionChange}
        placeSelect={onPlaceSelect}
      />
    </GeoapifyContext>
  )
}