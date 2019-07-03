import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const weatherKey =  '042abea1ba1d4d0a98f162505190307'

ReactDOM.render(<App weatherKey={weatherKey}/>, document.getElementById('root'));