import React from 'react'

import styles from './widget.module.scss'

import sunCloudsImg from '../../assets/img/weather/sun-clouds.png'
import sunImg from '../../assets/img/weather/sun.png'
import snowImg from '../../assets/img/weather/snow1.png'
import rainImg from '../../assets/img/weather/mini-rain.png'
import thunderImg from '../../assets/img/weather/mega-storm.png'
import locationImg from '../../assets/img/location.png'
import WeatherItem from '../WeatherItem'

const weatherVariants = [
  {
    main: 'Clouds',
    img: sunCloudsImg,
  },
  {
    main: 'Clear',
    img: sunImg,
  },
  {
    main: 'Snow',
    img: snowImg,
  },
  {
    main: 'Rain',
    img: rainImg,
  },
  {
    main: 'Thunderstorm',
    img: thunderImg,
  },
]

const cityItems = ['New York', 'Rome', 'London', 'Madrid', 'Minsk']

const Widget = ({ data, day, month, getWeatherByCity }) => {
  const tempConvert = (temp) => {
    const tempC = temp - 273.15
    return tempC.toFixed(1)
  }

  const timeUp = (time) => {
    const hours = new Date(time).getHours()
    const minutes = new Date(time).getMinutes()
    return `${hours}:${minutes}`
  }

  const toTextualDescription = (deg) => {
    if (deg > 337.5) return 'N'
    if (deg > 247.5) return 'W'
    if (deg > 157.5) return 'S'
    if (deg > 67.5) return 'E'
    return 'N'
  }

  const chooseImg = (main) => {
    const weather = weatherVariants.find((el) => el.main === main)
    if (weather) {
      return weather.img
    }
    return thunderImg
  }

  return (
    <>
      {data?.cod === 200 ? (
        <div className={styles.widget}>
          <div className={styles.content}>
            <div className={styles.widget_top}>
              <div className={styles.widget_top_left}>
                <div className={styles.widget_top_city}>
                  <img
                    src={locationImg}
                    alt=''
                  />
                  <p>{data.name}</p>
                </div>
                <div className={styles.widget_top_day}>
                  <p>
                    {day[new Date().getDay()]} - {month[new Date().getMonth()]}{' '}
                    {new Date().getDate()}
                  </p>
                </div>
                <div className={styles.widget_top_hours}>
                  <p>{timeUp(new Date())}</p>
                </div>
                <ul className={styles.widget_top_list}>
                  <li>
                    Feels Like: <span>{tempConvert(data.main.feels_like)}&deg;</span>
                  </li>
                  <li>
                    Wind:{' '}
                    <span>
                      {toTextualDescription(data.wind.deg)} {data.wind.speed} k/h
                    </span>
                  </li>
                  <li>
                    Sunrise: <span>{timeUp(data.sys.sunrise)}</span> / Sunset:{' '}
                    <span>{timeUp(data.sys.sunset)}</span>
                  </li>
                </ul>
              </div>
              <div className={styles.widget_top_right}>
                <div className={styles.widget_top_img}>
                  <img
                    src={chooseImg(data.weather[0].main)}
                    alt=''
                  />
                </div>
                <div className={styles.widget_top_deg}>
                  <p>{tempConvert(data.main.temp)}&deg;</p>
                  <p>{data.weather[0].main}</p>
                </div>
              </div>
            </div>
            <div className={styles.widget_bottom}>
              <ul className={styles.widget_list}>
                {cityItems.map((el) => (
                  <WeatherItem
                    key={el}
                    tempConvert={tempConvert}
                    weatherVariants={weatherVariants}
                    city={el}
                    chooseImg={chooseImg}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.widget + ' ' + styles.widget_loading}>
          <p>Загрузка...</p>
        </div>
      )}
    </>
  )
}

export default Widget
