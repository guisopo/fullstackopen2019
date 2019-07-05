import React from 'react'

const PersonList = ({isFiltering, persons, filteredList, deletePerson}) => {

  const ListItem = ({name,number, deletePerson}) => (
    <li key={name}>
      {name} {number} 
      <button onClick={deletePerson}>Delete</button>
    </li>
  )

  const listToMap = !isFiltering ? persons : filteredList

  return(
    <div>
      { 
        listToMap.map( person => 
          <ListItem
            key={person.name} 
            name={person.name}  
            number={person.number}
            deletePerson={()=>deletePerson(person.id, person.name)}
          />
        )
      }
    </div>
  )
}

export default PersonList