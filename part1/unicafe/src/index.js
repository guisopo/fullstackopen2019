import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad, totalFeedbacks}) => {
  if( !totalFeedbacks ) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <Statistic text={'Good'} value={good} />
          <Statistic text={'Neutral'} value={neutral} />
          <Statistic text={'Bad'} value={bad} />
          <Statistic text={'All'} value={totalFeedbacks} />
          <Statistic text={'Average'} value={(good - bad) / totalFeedbacks} />
          <Statistic text={'Positive'} value={good * 100 / totalFeedbacks} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedbacks, setTotal] = useState(0);

  const sendFeedback = (feedback) => {
    switch (feedback) {
      case 'good':
        setGood( good + 1);
        setTotal( totalFeedbacks + 1);
        break;
      case 'neutral':
        setNeutral( neutral + 1);
        setTotal( totalFeedbacks + 1);
        break;
      case 'bad':
        setBad( bad + 1);
        setTotal( totalFeedbacks + 1);
        break;
    
      default:
        console.log('Sorry, no case for ' + feedback + '.');
        break;
    }
  }

  return (
    <React.Fragment>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>sendFeedback('good')} text='good' />
      <Button handleClick={()=>sendFeedback('neutral')} text='neutral' />
      <Button handleClick={()=>sendFeedback('bad')} text='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} totalFeedbacks={totalFeedbacks}/>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));