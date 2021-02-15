import React, { useState, useEffect } from 'react'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import Filter from './components/filter'
import personService from './services/persons'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  } else if (success === true) {
    return (
      <div className="success">
      {message}
    </div>
    )
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ success, setSuccess ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const personInPhonebook = persons.some((p) => p.name === newName)
    if (personInPhonebook) {
      updateNumber(personObject)
    } else {
      personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
          .catch(error => {
            setSuccess(false)
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
              setSuccess(null)
            }, 5000)
          })
          setSuccess(true)
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
            setSuccess(null)
          }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    const verify = window.confirm(`Delete ${person.name}?`)

    if (verify) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(persons => persons.id !== person.id))
          setSuccess(true)
          setMessage(`Removed ${person.name}`)
          setTimeout(() => {
            setMessage(null)
            setSuccess(null)
          }, 5000)
        })

    }
  }

  const updateNumber = (person) => {
    const verify =
      window.confirm(`${person.name} is already in the phonebook.
      Do you want to replace the old number with a new one?`)

    if (verify) {
      const personWithNumberToChange = persons.find(p => p.name === person.name)
      const personWithChangedNumber = { ...personWithNumberToChange, number: newNumber}

      personService
        .update(personWithChangedNumber.id, personWithChangedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== personWithNumberToChange.id ? person: returnedPerson)
          )
          setSuccess(true)
          setMessage(`Updated ${person.name}`)
          setTimeout(() => {
            setMessage(null)
            setSuccess(null)
          }, 5000)
        })
        .catch(error => {
          setSuccess(false)
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
            setSuccess(null)
          }, 5000)
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}
                    success={success} />
        <Filter
          filter={filter}
          onFilterChange={handleFilter} />
      <h3>add a new</h3>
        <PersonForm
          addPerson={addPerson}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          newName={newName}
          newNumber={newNumber}
        />
      <h3>Numbers</h3>
        <Persons
          persons={persons}
          filter={filter}
          remove={removePerson}
      />
    </div>
  )

}

export default App