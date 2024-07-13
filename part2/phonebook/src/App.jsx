/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import phoneService from './services/phonebook.js'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = newFilter === ''
  ? persons
  : persons.filter(person => {
    const lowerName = person.name.toLowerCase()
    const lowerFilter = newFilter.toLowerCase()
    return lowerName.includes(lowerFilter)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setNewFilter={setNewFilter} newFilter={newFilter} />
      <h2>Add New Contact</h2>
      <Notification error={errorMessage} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNewFilter={setNewFilter}
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
      <h2>Contact List</h2>
      <Persons
        persons={persons}
        personsToShow={personsToShow}
        setPersons={setPersons}
        setNewFilter={setNewFilter}
      />
    </div>
  )
}

export default App