import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
  return(
    <React.Fragment>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </React.Fragment>
  )
}

export default Course;