import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { WeatherInfo } from './pages/WeatherInfo'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/weather/:lon/:lat/:temperature' element={<WeatherInfo />} />
    </Routes>
  )
}