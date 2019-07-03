import React from 'react'

const Filter = ({newQuery, handleQueryChange}) => (
  <div>
    Find countries: 
    <input 
      value={newQuery}
      onChange={handleQueryChange}
    />
  </div>
)

export default Filter