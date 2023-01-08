import { useEffect, useState } from 'react'
import Input from '../Input'
import Widget from '../widget'

import styles from './app.module.scss'

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const App = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState(null)
  const [coordinates, setCoordinates] = useState({
    lon: 37.61,
    lat: 55.75,
  })

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}&lat=${coordinates.lat}&lon=${coordinates.lon}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setValue('')
        console.log(data)
      })
  }, [coordinates])

  const getWeatherByCity = async (value) => {
    if (value.length) {
      const valueToLowerCase = value.toLowerCase()
      const cityData = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${valueToLowerCase}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setCoordinates({ lon: data[0].lon, lat: data[0].lat })
        })
    }
  }

  return (
    <div className={styles.app}>
      <Input
        value={value}
        setValue={setValue}
        getWeatherByCity={getWeatherByCity}
      />
      <Widget
        data={data}
        day={day}
        month={month}
      />
    </div>
  )
}

export default App
