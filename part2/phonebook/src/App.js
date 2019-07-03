import React, { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newQuery, setNewQuery ] = useState('')
  const [ filteredList, setFilteredList ] = useState(persons)
  const [ isFiltering, setFiltering ] = useState(false)

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const nameExist = persons.find( person => person.name.toLowerCase() === newName.toLowerCase() )
    
    if(nameExist) {
      return alert(  `${newName} is already added to phonebook`)
    }
    
    setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleQueryChange= (event) => {
    event.target.value.length > 0 ? setFiltering(true) : setFiltering(false)
    setNewQuery(event.target.value)
    filterPhoneBook(event.target.value)
  }

  const filterPhoneBook = (query) => {
    const filteredList = persons.filter( 
      (person) => person.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 
    )
    setFilteredList(filteredList)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newQuery={newQuery} 
        handleQueryChange={handleQueryChange}
      />
      <h2>Add a new Contact</h2>
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName} 
      />
      <h2>Numbers</h2>
      <PersonList 
        isFiltering={isFiltering}
        persons={persons}
        filteredList={filteredList}
      />
    </div>
  )
}

export default App