/* eslint-disable react/prop-types */
import phoneService from './../services/phonebook.js'
const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setNewFilter,
  persons,
  setPersons,
  setErrorMessage}) => {

  const existingPersonNewNumber = () => {
    if (persons.filter(person => person.name === newName).length === 0) {
      return false
    } else {
      return persons.filter(person => person.name === newName)[0].number !== newNumber
    }
  }

  const existingPersonSameNumber = () => {
    if (persons.filter(person => person.name === newName).length === 0) {
      return false
    } else {
      return persons.filter(person => person.name === newName)[0].number === newNumber
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const updatePerson = () => {
    if (window.confirm(`${newName} is already in the phonebook. Do you want to update the number to ${newNumber}?`)) {
      const personToUpdate = persons.find(p => p.name === newName)
      const id = personToUpdate.id

      const updatedPersonObject = {
        ...personToUpdate,
        number: newNumber
      }

      phoneService
      .update(id, updatedPersonObject)
      .then(() => {
        setPersons(persons.map(p => p.name !== newName ? p : updatedPersonObject))
        setNewName('')
        setNewNumber('')
        setNewFilter('')
      })
    }
  }

  const addPerson = () => {
    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    phoneService
    .create(newPersonObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNewFilter('')
    })
  }

  const checkPerson = (event) => {
    event.preventDefault()
    if (newName.length === 0) {
      // need a name value to add a person
      setErrorMessage(`Name cannot be blank`)
      setTimeout(() => setErrorMessage(null), 2000)
    } else if (existingPersonSameNumber()) {
      // trying to add a person and number that already exists
      setErrorMessage(`${newName} is already in the phonebook`)
      setTimeout(() => setErrorMessage(null), 2000)
    } else if (existingPersonNewNumber()) {
      // trying to add an existing person but new number, update?
      updatePerson()
    } else {
      // it's a new person, so now add
      addPerson()
    }
  }

  return (
    <form onSubmit={checkPerson}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm