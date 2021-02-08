import React from 'react'

const Person = ({persons, remove}) => (
    <p>{persons.name} {persons.number} <button onClick={() =>
        remove(persons)}>delete</button></p>
)

const Persons = ({persons, filter, remove}) => {
    const filteredPersons = persons.filter((persons)  => (
        persons.name.toLowerCase().includes(filter.toLowerCase())
    ))
    return (
        filteredPersons.map(persons =>
        <Person key ={persons.name} persons ={persons} remove={remove} />)
    )
}

export default Persons