import React from 'react'
import List from './List'
import CountryProfile from './CountryProfile'

const Response = ({singleCountry, filteredList, showCountryInfo, weatherData}) => (
  <div>
    { 
      !singleCountry
        ? <List 
            filteredList={filteredList} 
            showCountryInfo={showCountryInfo}
          />
        : <CountryProfile 
            countryData={singleCountry} 
            weatherData={weatherData}
          />
    }
  </div>
)

export default Response