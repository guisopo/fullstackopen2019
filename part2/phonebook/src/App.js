import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newQuery, setNewQuery] = useState('')
  const [filteredList, setFilteredList] = useState(persons)
  const [isFiltering, setFiltering] = useState(false)
  const [message, setMessage] = useState('')
  
  // Retrieve Data during Initialization
  const initialHook = () => {
    personService
      .getAll()
      .then(initialPersons => 
        setPersons(initialPersons)
      )
  }
  
  useEffect( initialHook, [])

  // Filter Contact List when newQuery updates
  const filterPhoneBook = () => {
    const filteredList = persons.filter( 
      (person) => person.name.toLowerCase().indexOf(newQuery.toLowerCase()) !== -1 
    )
    setFilteredList(filteredList)
  }

  useEffect(filterPhoneBook, [newQuery])

  const showNotification = (content, status) => {
    setMessage({
      content: content, 
      status: status
    })
    setTimeout(() => setMessage({
      content: '', 
      status: ''})
    , 4000)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const nameExist = persons.find( person => person.name.toLowerCase() === newName.toLowerCase() )
    
    if(nameExist) {
      updatePerson(nameExist.id, personObject)
      return
    }

    personService
      .addPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name} to the contact list.`, 'success')
      })
      .catch(error => {
        console.log(error.response.data.error);
        showNotification(error.response.data.error);
      })
  }

  const updatePerson = (id, personObject) => {
    const result = window.confirm(`${personObject.name} was already added to the contact list. Would you like to update it's phone number?`)
    
    if(result) {
      personService
        .updatePerson(id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map( person =>
            person.id !== id ? person : returnedPerson
          ))
          showNotification(`Updated ${returnedPerson.name} phone number`, 'success')
        })
        .catch((error) => {
          console.log(error.response.data.error);
          showNotification(error.response.data.error);
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    const result = window.confirm(`Delete ${name}?`)
    
    if(result) {
      personService
        .deletePerson(id)
        .then(setPersons(persons.filter(n => n.id !== id)))
        

      setNewQuery('')
      setFilteredList([])
      setFiltering(false)
      showNotification(`Deleted ${name} from the contact list`, 'success')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleQueryChange= (event) => {
    event.target.value.length > 0 
      ? setFiltering(true) 
      : setFiltering(false)
      
    setNewQuery(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter 
        newQuery={newQuery} 
        handleQueryChange={handleQueryChange}
      />
      <h2>Add a new Contact</h2>
      <ContactForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName} 
      />
      <h2>Numbers</h2>
      <ContactList 
        isFiltering={isFiltering}
        persons={persons}
        filteredList={filteredList}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App