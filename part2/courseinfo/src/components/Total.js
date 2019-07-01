import React from 'react';

const Total = ({parts}) => {
  let totalExcercises = parts.reduce( (a,c) =>
    a + c.exercises, 0
  )

  return (
    <div>
      <p><b>Total of {totalExcercises} exercises.</b></p>
    </div>
  )
}

export default Total;