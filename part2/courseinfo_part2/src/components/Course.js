// 2.1 the Header component, which renders the title of the course.
const Header = ({ name }) => {
  return (
    <h3>{name}</h3>
  )
}

// 2.1 The Content component, which renders the parts and their number of exercises.
// Component use map function to render each part using the Part component.
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

// 2.1 The Part component, which renders the name of the part and the number of exercises.
const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

// 2.2 The Total component, which renders the total number of exercises.
const Total = ({ parts }) => {
  
  // 2.3 Use the reduce method to calculate the sum of the exercises.
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <p><strong> total of {total} exercises</strong></p>
  )
}

// 2.1 Course component, which contains the Header, Content, and Total components.
// The Course component takes a course object as a prop.
// The Header, Content, and Total components take the course object as a prop.
const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}


export default Course