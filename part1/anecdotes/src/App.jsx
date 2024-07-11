/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ title, text, votes }) => {
  votes = votes || 0
  if (title === 'Anecdote with Most Votes' && votes < 1) {
    return (
      <div>
        <h2>{title}</h2>
        <p>Vote for an anecdote to see the top-voted</p>
      </div>
    )
  }
  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    "Whatever doesn't kill you makes you stronger",
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [most, setMost] = useState(0)

  const handleNextClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random)
  }

  const handleVoteClick = () => {
    const voteCounts = Object.values(votes)
    const top = voteCounts.length > 0 ? Math.max(...voteCounts) : 0
    const newVotes = {
      ...votes,
      [selected]: votes[selected] + 1 || 1
    }
    setVotes(newVotes)
    if (newVotes[selected] >= top) setMost(selected)
  }

  return (
    <div>
      <Display title='Anecdote of the Day' text={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={handleNextClick} text='next anecdote' />
      <Button handleClick={handleVoteClick} text='vote' />
      <Display title='Anecdote with Most Votes' text={anecdotes[most]} votes={votes[most]}/>
    </div>
  )
}

export default App