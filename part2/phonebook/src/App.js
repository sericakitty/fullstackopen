import { useState, useEffect } from 'react'

import personService from './services/PersonService'


// 2.13 import Filter, PersonForm, and Persons components from their own files
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

// importing Notification component
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

// 2.6 creating App component with array of persons state variable and newName state variable
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // 2.11 creating useEffect hook to fetch data from json-server
  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // 2.9 creating filterPersons function
  const filterPersonsByName = (event) => {
    event.preventDefault()
    setFilterName(event.target.value)
  }

  // 2.6 creating submit handler function.
  const addPerson = (event) => {
    event.preventDefault()
    // 2.7 creating if statement to check if newName is already in persons array
    // if it is, alert the user that the name is already in the phonebook
    if (persons.some(person => person.name === newName)) {

      // 2.15 creating function for updating person's number if the person's name is already in the phonebook.
      // if the user wants to update the person's number, we need to confirm that the user wants to update the person's number.
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updatedNumber = { ...person, number: newNumber }

        personService.updatePerson(person.id, updatedNumber).then(response => {
          // after updating person's number in json-server,
          // we want to update the person's number in the persons array,
          // so that the updated person's number is displayed in the browser.
          setPersons(persons.map(p => p.id !== person.id ? p : response.data))
          setMessage(`Updated ${newName}'s number`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
          .catch(error => {
            console.log('Person\'s number could not be updated in json-server', error)

            // 2.17 if the person's data has already been removed from the server, 
            // we want to display an error message in the browser.
            setErrorMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }

    // 2.12 creating POST request to json-server. 
    // Saving new person's name and number to json-server.

    personService.createPerson(newPerson).then(response => {
      setPersons(persons.concat(response.data)) // 2.12 adding response.data to persons array. Added person is now displayed in the browser.
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
      .catch(error => {
        console.log('Person data could not be saved to json-server', error)
      })

    setNewName('')
    setNewNumber('')
  }

  // 2.14 creating deletePerson function
  const deletePerson = (person) => {
    // before deleting person from json-server,
    // we need to confirm that the user wants to delete the person data
    if (window.confirm(`Delete ${person.name} ?`)) {

      personService.removePerson(person.id).then(() => {
        // after deleting person from json-server,
        // we need to filter out the deleted person data from the persons array.
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
        .catch(error => {
          console.log('Person data could not be deleted from json-server', error)

        })
    }
  }

  // creating event handler function for name input
  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  // 2.8 creating event handler function for number input
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>

      {/* Rendering ErrorMessage component */}
      <ErrorMessage errorMessage={errorMessage} />

      {/* Rendering Notification component */}
      <Notification message={message} />

      {/* Rendering Filter component */}
      <Filter filterName={filterName} filterPersonsByName={filterPersonsByName} />

      <h3>Add a new</h3>

      {/* Rendering PersonForm component */}
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      {/* Rendering Persons component */}
      <Persons
        filterName={filterName}
        persons={persons}
        deletePerson={deletePerson}
      />
    </>
  )

}

export default App
