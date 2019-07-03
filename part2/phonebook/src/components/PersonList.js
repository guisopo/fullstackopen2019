import React from 'react'

const PersonList = ({isFiltering, filteredList, persons}) => (
  <div>
    <div>
      { 
        !isFiltering
        ? persons.map( person => <li key={person.name}>{person.name}  {person.number}</li>)
        : filteredList.map( person => <li key={person.name}>{person.name}  {person.number}</li>)
      }
    </div>
  </div>
)

export default PersonList