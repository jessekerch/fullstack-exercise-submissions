/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import phoneService from './../services/phonebook.js'
const Person = ({ person, removePerson }) => {

  return (
      <tr>
        <td>{person.name}:</td>
        <td>{person.number}:</td>
        {<td>
          <button onClick={removePerson}>
            delete
          </button>
        </td>}
      </tr>
  )
}

const Persons = ({ persons, personsToShow, setPersons, setNewFilter }) => {

  const removePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      phoneService
      .remove(id)
      .then(removedPerson => {
        const newPersons = persons.filter(p => p.id !== id)
        setPersons(newPersons)
        setNewFilter('')
      })
      .catch(error => console.log('Unable to remove that person'))
    }
  }

  return (
    <table><tbody>
    {personsToShow.map(person =>
      <Person
        key={person.id}
        person={person}
        removePerson={() => removePerson(person.id, person.name)}
      />
    )}
    </tbody></table>
  )
}

export default Persons