import React from 'react'
import servicePerson from '../services/persons'

const PersonList = ({isFiltering, filteredList, persons, setPersons}) => {
  const deletePerson = (id) => {
    servicePerson
      .deletePerson(id)
      .then(setPersons(persons.filter(n => n.id !== id)))
  }

  const ListItem = ({name,number, id}) => (
    <li key={name}>
      {name} {number} <button onClick={()=>deletePerson(id)}>Delete</button>
    </li>
  )

  return(
    <div>
      <div>
        { 
          !isFiltering
            ? persons.map( person => 
                <ListItem
                  id={person.id}
                  key={person.name} 
                  name={person.name}  
                  number={person.number} 
                />
              )
            : filteredList.map( person => 
                <ListItem
                  id={person.id}
                  key={person.name} 
                  name={person.name}  
                  number={person.number} 
                />
              )
        }
      </div>
    </div>
  )
}

export default PersonList