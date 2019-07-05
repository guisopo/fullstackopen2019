import React from 'react'

const ContactList = ({isFiltering, persons, filteredList, deletePerson}) => {

  const ListItem = ({name,number, deletePerson}) => (
    <li key={name}>
      {name} {number} 
      <button onClick={deletePerson}>Delete</button>
    </li>
  )

  const contactList = !isFiltering ? persons : filteredList

  return(
    <div>
      { 
        contactList.map( person => 
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

export default ContactList