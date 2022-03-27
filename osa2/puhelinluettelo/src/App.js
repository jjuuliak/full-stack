import { useState, useEffect } from 'react'

import service from './services/details'

const Person = (props) => {
  return (
    <p key={props.person.id}>
      {props.person.name} {props.person.number}
      <button onClick={props.toDelete}>delete</button>
    </p>
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
  const [actionMessage, setMessage] = useState(null)

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

  const toDelete = person => {
    const result = window.confirm('Delete ' + person.name + ' ?');
    if(result) {
      service
        .deletePerson(person)
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage(
          [`${person.name} has been deleted`, false]
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

  const addInfo = (event) => {
    event.preventDefault()
    const newObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.some(p => p.name === newName)) {
      const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      const updatedPerson = persons.find(p => p.name === newName)
      if(confirmation) {
        service
          .update(updatedPerson.id, newObject)
            .then(returnedPerson => {
              setPersons(persons.map(per => per.id !== updatedPerson.id ? per : returnedPerson))
              setNewName('')
              setNewNumber('')
              setMessage(
                [`${updatedPerson.name}'s phone number was updated`, true]
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      service
        .create(newObject)
        .then(returnedDetails => {
          setPersons(persons.concat(returnedDetails))
          setNewName('')
          setNewNumber('')
          setMessage(
            [`Added ${returnedDetails.name}`, true]
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if(message[1]) {
      return (
        <div className="success">
          {message[0]}
        </div>
      )
    } else {
      return (
        <div className="error">
          {message[0]}
        </div>
      )
    }

  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().match(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={actionMessage} />

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
      <div className='person'>
        {personsToShow.map(person =>
          <Person
            key={person.id}
            person={person}
            toDelete={() => toDelete(person)}
          />
        )}
      </div>

    </div>
  )

}

export default App