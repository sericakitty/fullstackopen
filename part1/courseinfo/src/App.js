// Header component, which displays the title of the course
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

// 1.2 Content component, which displays the name and number of exercises of each part
const Content = (props) => {
  const [part1, part2, part3] = props.parts
  return (
    <div>
      <Part name={part1.name} exercise={part1.exercises} />
      <Part name={part2.name} exercise={part2.exercises} />
      <Part name={part3.name} exercise={part3.exercises} />
    </div>
  )
}

// Part component, which displays the name and number of exercises of a part
const Part = (props) => {
  return (
    <p>{props.name} {props.exercise}</p>
  )
}

// Total component, which displays the sum of the exercises of all parts 
const Total = (props) => {
  let total = 0

  for (const part of props.parts) {
    total += part.exercises
  }

  return (
    <p>Number of exercises {total}</p>
  )
}

// 1.1 App component
const App = () => {

  // 1.3 - 1.5 Course object, which contains course name and array of parts. Each part contains name and number of exercises.
  const course = {
    name: 'Half Stack application development',
    parts: [

      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }

    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App