import React from 'react'

const Filter = ({newQuery, handleQueryChange}) => (
  <form>
        <div>
          Filter shown with 
          <input value={newQuery} onChange={handleQueryChange}/>
        </div>
      </form>
)

export default Filter