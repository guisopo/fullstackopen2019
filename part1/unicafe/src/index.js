import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const sendFeedback = (feedback) => {
    switch (feedback) {
      case 'good':
        setGood( good + 1);
        break;
      case 'neutral':
        setNeutral( neutral + 1);
        break;
      case 'bad':
        setBad( bad + 1);
        break;
    
      default:
        console.log('Sorry, no case for ' + feedback + '.');
        break;
    }
  }

  return (
    <React.Fragment>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={()=>sendFeedback('good')} text='good' />
        <Button handleClick={()=>sendFeedback('neutral')} text='neutral' />
        <Button handleClick={()=>sendFeedback('bad')} text='bad' />
      </div>
      <h1>Statistics</h1>
      <div>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));