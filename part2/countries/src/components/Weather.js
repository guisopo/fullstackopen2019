import React from 'react'

const Weather = ({weatherData}) => (
  <div>
    <h2>Weather in {weatherData.location.name}</h2>
    <p><b>Temperature:</b> {weatherData.current.temp_c}</p>
    <img src={weatherData.current.condition.icon} alt="weather icon"/>
    <p><b>Wind:</b> {weatherData.current.wind_kph}kph direction {weatherData.current.wind_dir}</p>
  </div>
)

export default Weather