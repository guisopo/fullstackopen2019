import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './Weather';

const CountryProfile = ({countryData}) => {
  const [weatherData, setWeatherData] = useState()

  const weatherHook = () => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=042abea1ba1d4d0a98f162505190307&q=${countryData.name}`)
      .then(response => {
        setWeatherData(response.data)
      })
  }

  useEffect(weatherHook, [countryData])

  return(
    <div>
    <h2>{countryData.name}</h2>
    <p>Capital: {countryData.capital}</p>
    <p>Population: {countryData.population}</p>
    <p>Languages:</p>
    <ul>
      {countryData.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
    </ul>
    <img src={countryData.flag} alt="flag"/>
    {
      weatherData ? <Weather weatherData={weatherData}/> : ''
    }
  </div>
  )
}

export default CountryProfile