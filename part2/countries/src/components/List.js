import React from 'react'

const List = ({filteredList}) => (
  <div>
    { 
      filteredList.length > 10 
      ? <p>Too many matches, specify another filter</p>
      : filteredList.map( country => <li key={country.alpha3Code}>{country.name}</li>)
    }
  </div>
)

export default List