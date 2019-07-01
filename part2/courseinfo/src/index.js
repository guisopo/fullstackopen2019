import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return(
      <h1>{course}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      { parts.map( p => <Part name={p.name} exercises={p.exercises} /> )}
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({parts}) => {
  const totalExcercises = () => {
    let n = 0;
    parts.forEach(p => n += p.exercises)
    return n;
  }

  return (
    <div>
      <p>Number of exercises {totalExcercises()}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <React.Fragment>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))