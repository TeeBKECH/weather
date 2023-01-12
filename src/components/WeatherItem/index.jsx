import React, { useEffect, useState } from 'react'

const WeatherItem = ({ chooseImg, weatherVariants, tempConvert, city }) => {
  const [data, setData] = useState(null)
  const [coordinates, setCoordinates] = useState(null)

  const splitCity = city.toLowerCase().replace(' ', '-')

  useEffect(() => {
    if (coordinates) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}&lat=${coordinates[0]}&lon=${coordinates[1]}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          console.log(data)
          console.log(coordinates)
        })
    }
  }, [coordinates])

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${splitCity}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setCoordinates([data[0].lon, data[0].lat])
      })
  }, [])

  return (
    <li>
      <span>{city}</span>
      <div>
        <img
          src={chooseImg(data?.weather[0].main)}
          alt=''
        />
      </div>
      <span>
        {tempConvert(data?.main.temp_max)}&deg; / {tempConvert(data?.main.temp_min)}&deg;
      </span>
    </li>
  )
}

export default WeatherItem
