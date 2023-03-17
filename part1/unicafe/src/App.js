
import { useState } from 'react'

// 1.8 Statistics component, which displays the statistics of the feedback given.
// good, neutral, and bad are state variables, which are passed as props to Statistics component.
// all, average, and positive are calculated variables, which are passed as props to StatisticLine component.
const Statistics = (props) => {
  const [good, neutral, bad] = props.stats
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = (good / all) * 100

  // 1.9 Conditional rendering if no feedback is given
  if (all === 0) {
    return <p>No feedback given</p>
  }

  // 1.11 Statistics component returns a table with the statisticLine components
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive + ' %'} />
      </tbody>
    </table>
  )
}

// 1.10 StatisticLine component, which displays a single table row with the statistic.
// row contains the text and value of the statistic.
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}

// 1.6 - 1.7 Creating App component with state variables
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <>
      <h1>give feedback</h1>
      <div>
        {/* 1.10 buttons with anonymous functions which set the state variables */}
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h2>statistics</h2>
      <Statistics stats={[good, neutral, bad]} />
    </>
  )
}

export default App;
