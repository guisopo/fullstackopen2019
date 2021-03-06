import React from 'react'
import ListItem from './ListItem';

const List = ({filteredList, showCountryInfo}) => {

  const listItems = () => filteredList.map( country => 
    <ListItem 
      key={country.numericCode}
      name={country.name}
      showCountryInfo={()=>showCountryInfo(country)} 
    />
  )

  return (
    filteredList.length > 15 
      ? <p>Too many matches, specify another filter</p>
      : <ul>{listItems()}</ul>
  )
}

export default List