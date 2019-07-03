import React from 'react'
import List from './List'
import CountryProfile from './CountryProfile'

const Response = ({filteredList, showCountryInfo, weatherData, setSingleCountry}) => (
  <div>
    { 
      filteredList.length !== 1
      ? <List filteredList={filteredList} showCountryInfo={showCountryInfo}/>
      : <CountryProfile setSingleCountry={setSingleCountry} countryData={filteredList[0]} weatherData={weatherData}/>
    }
  </div>
)

export default Response