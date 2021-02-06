import React from 'react'

const Person = ({persons}) => (
    <p>{persons.name} {persons.number}</p>
)

const Persons = ({persons, filter}) => {
    const filteredPersons = persons.filter((persons)  => (
        persons.name.toLowerCase().includes(filter.toLowerCase())
    ))
    return (
        filteredPersons.map(persons =>
        <Person key ={persons.name} persons ={persons} />)
    )
}

export default Persons