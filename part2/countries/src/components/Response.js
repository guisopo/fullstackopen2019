import React from 'react'
import List from './List'
import CountryProfile from './CountryProfile'

const Response = ({filteredList, showCountryInfo, weatherData}) => (
  <div>
    { 
      filteredList.length !== 1
      ? <List filteredList={filteredList} showCountryInfo={showCountryInfo}/>
      : <CountryProfile countryData={filteredList[0]} weatherData={weatherData}/>
    }
  </div>
)

export default Response