import React from 'react'
import ListItem from './ListItem';

const List = ({filteredList, showCountryInfo}) => (
  <div>
    { 
      filteredList.length > 15 
      ? <p>Too many matches, specify another filter</p>
      : filteredList.map( country => <ListItem key={country.numericCode} name={country.name} showCountryInfo={showCountryInfo} />)
    }
  </div>
)

export default List