import React from 'react'
import List from './List'
import CountryProfile from './CountryProfile'

const Response = ({filteredList}) => (
  <div>
    { 
      filteredList.length !== 1
      ? <List filteredList={filteredList}/>
      : <CountryProfile countryData={filteredList[0]}/>
    }
  </div>
)

export default Response