import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1>Log in to application</h1>
      <form>
        <div>
          username:
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target)}
          />
        </div>
        <div>
          password:
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target)}
          />
        </div>
      </form>
    </div>
  )
}

export default App;
