// 2.10 creating Filter component
// Filter component takes in props for filterName and filterPersonsByName
// and returns an input field for filtering persons by name
const Filter = ({ filterName, filterPersonsByName }) => {
  return (
    <>
      filter shown with <input value={filterName} onChange={filterPersonsByName} />
    </>
  )
}

export default Filter