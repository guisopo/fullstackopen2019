import React from 'react'

const CountryProfile = ({countryData}) => (
  <div>
    <h2>{countryData.name}</h2>
    <p>Capital: {countryData.capital}</p>
    <p>Population: {countryData.population}</p>
    <p>Languages:</p>
    <ul>
      {countryData.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
    </ul>
    <img src={countryData.flag} alt="flag"/>
  </div>
)

export default CountryProfile