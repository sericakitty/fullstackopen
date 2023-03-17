import { useState } from 'react'

const App = () => {

  // 1.12 anecdotes array of anecdote objects.
  // Each object contains the title of the anecdote and the number of votes.
  const [anecdotes, setAnecdotes] = useState([
    {
      title: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      title: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      title: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      title: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      title: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      title: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      title: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
      votes: 0
    },
    {
      title: 'The only way to go fast, is to go well.',
      votes: 0
    },
  ])

  const [selected, setSelected] = useState(0)

  // 1.14 variable for the anecdote with most votes
  // using reduce to compare first and second anecdote and return the one with most votes
  const mostVoted = [...anecdotes].reduce((max, anecdote) => max.votes > anecdote.votes ? max : anecdote)

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        <p>
          {anecdotes[selected].title}
          <br />
          has {anecdotes[selected].votes} votes
        </p>
      </div>
      <div>
        {/* 1.13 button for voting the selected anecdote 
            function copy the anecdotes array and increase the votes
        */}
        <button onClick={() => {
          const copy = [...anecdotes]
          copy[selected].votes += 1
          setAnecdotes(copy)
        }}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdotes</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>
        <p>
          {mostVoted.title}
          <br />
          has {mostVoted.votes} votes
        </p>
      </div>

    </>
  )
}

export default App