// 2.10 creating Persons component
// Persons component takes in props for persons and filterName
// and returns a list of persons
const Persons = ({ filterName, persons, deletePerson }) => {


  return (
    <>
      {/* if filterName is empty, show all persons, otherwise filter persons by name */}
      {persons.filter(person =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      ).map(person =>
        <li key={person.name}>
          {/* every person in the list will have a delete button */}
          {person.name} {person.number} <button className='deletebtn' onClick={() => deletePerson(person)}>delete</button> 
        </li>
      )}
    </>
  )
}


export default Persons