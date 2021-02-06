import React, { useState } from 'react'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import Filter from './components/filter'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const personInPhonebook = persons.some((p) => p.name === newName)
    if (personInPhonebook) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
      setNewName('')
      setNewNumber('')
    }

  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  )

}

export default App