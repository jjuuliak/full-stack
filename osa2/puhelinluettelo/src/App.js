import { useState, useEffect } from 'react'

import service from './services/details'

const Person = (props) => {
  return (
    <p>{props.person.name} {props.person.number}</p>
  )
}

const Persons = (props) => {
  return (
  <div>
    {props.personsToShow.map(person => 
      <Person key={person.name} person={person} />
    )}
  </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input 
        value={props.newFilter}
        onChange={props.onChange}
      />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    service
      .getAll()
        .then(pbDetails => {
          setPersons(pbDetails)
        })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const addInfo = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.some(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    } else {
      service
        .create(newObject)
        .then(returnedDetails => {
          setPersons(persons.concat(returnedDetails))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().match(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} onChange={handleFilterChange}/>

      <h2>add a new</h2>
      <form onSubmit={addInfo}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>

    </div>
  )

}

export default App