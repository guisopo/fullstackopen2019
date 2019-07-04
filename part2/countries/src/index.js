import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const weatherApiKey =  '042abea1ba1d4d0a98f162505190307'

ReactDOM.render(<App apiKey={weatherApiKey}/>, document.getElementById('root'));