// 2.10 creating PersonForm component
// PersonForm component takes in props for newName, handleNameChange, newNumber, handleNumberChange, and addPerson
// and returns a form with input fields for name and number and a submit button
const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson }) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm