import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({title, anecdote, points, alwaysShow}) => {
  if(!points && !alwaysShow) {
    return(
      <div>
        <h1>{title}</h1>
        <p>No votes yet.</p>
      </div>
    )
  }
  return(
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {points} votes.</p>
    </div>
  )
}

const App = (props) => {
 
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(props.points)
  
  const maxValue = points.indexOf(Math.max.apply(null, points))

  const getRandomAnecdote = (max) => {
    const n = Math.floor(Math.random() * Math.floor(max))
    setSelected(n)
  }

  const updateVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <React.Fragment>
      <Anecdote title='Anecdote of the day' anecdote={props.anecdotes[selected]} points={points[selected]} alwaysShow={true} />
      <Button handleClick={()=>updateVote(props.anecdotes[selected])} text='Vote' />
      <Button handleClick={()=>getRandomAnecdote(props.anecdotes.length)} text='Next Anecdote' />
      <Anecdote title='Anecodte with most votes' anecdote={props.anecdotes[maxValue]} points={points[maxValue]} />
    </React.Fragment>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const pointsArray = Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} points={pointsArray} />,
  document.getElementById('root')
)