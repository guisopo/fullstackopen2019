import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return(
    <React.Fragment>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </React.Fragment>
  )
}

const Header = ({name}) => {
  return(
      <h1>{name}</h1>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))