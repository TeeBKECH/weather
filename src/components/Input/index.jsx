import React from 'react'

import sendImg from '../../assets/img/send.svg'
import styles from './input.module.scss'

const Input = ({ value, setValue, getWeatherByCity }) => {
  return (
    <div className={styles.control}>
      <input
        type='text'
        className={styles.input}
        placeholder='Введите город...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={styles.submit}
        onClick={() => getWeatherByCity(value)}
      >
        <img
          src={sendImg}
          alt='Send'
        />
      </button>
    </div>
  )
}

export default Input
