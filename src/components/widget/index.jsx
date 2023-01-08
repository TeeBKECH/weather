import React from 'react'

import styles from './widget.module.scss'

import snowImg1 from '../../assets/img/weather/snow1.png'
import snowImg2 from '../../assets/img/weather/snow2.png'
import sunImg from '../../assets/img/weather/sun.png'
import rainSnowImg from '../../assets/img/weather/rain-snow.png'
import cloudsImg from '../../assets/img/weather/clouds1.png'
import locationImg from '../../assets/img/location.png'

const Widget = ({ data, day, month }) => {
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
                    src={snowImg1}
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
                <li>
                  <span>Mon</span>
                  <div>
                    <img
                      src={snowImg1}
                      alt=''
                    />
                  </div>
                  <span>30&deg; / 25&deg;</span>
                </li>
                <li>
                  <span>Mon</span>
                  <div>
                    <img
                      src={snowImg2}
                      alt=''
                    />
                  </div>
                  <span>30&deg; / 25&deg;</span>
                </li>
                <li>
                  <span>Mon</span>
                  <div>
                    <img
                      src={sunImg}
                      alt=''
                    />
                  </div>
                  <span>30&deg; / 25&deg;</span>
                </li>
                <li>
                  <span>Mon</span>
                  <div>
                    <img
                      src={rainSnowImg}
                      alt=''
                    />
                  </div>
                  <span>30&deg; / 25&deg;</span>
                </li>
                <li>
                  <span>Mon</span>
                  <div>
                    <img
                      src={cloudsImg}
                      alt=''
                    />
                  </div>
                  <span>30&deg; / 25&deg;</span>
                </li>
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
