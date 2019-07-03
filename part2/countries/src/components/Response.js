import React from 'react'
import List from './List'
import CountryProfile from './CountryProfile'

const Response = ({filteredList, showCountryInfo}) => (
  <div>
    { 
      filteredList.length !== 1
      ? <List filteredList={filteredList} showCountryInfo={showCountryInfo}/>
      : <CountryProfile countryData={filteredList[0]}/>
    }
  </div>
)

export default Response