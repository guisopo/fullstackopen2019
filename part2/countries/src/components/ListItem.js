import React from 'react'

const ListItem = ({name, showCountryInfo}) => (
  <li>
    {name}
    <button onClick={showCountryInfo}>Show</button>
  </li>
)


export default ListItem