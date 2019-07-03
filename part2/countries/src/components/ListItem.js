import React from 'react'

const ListItem = ({name, showCountryInfo}) => {

  return(
    <li>
      {name}
      <button onClick={()=>showCountryInfo(name)}>Show</button>
    </li>
  )
}


export default ListItem