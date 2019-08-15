import React from 'react'
import Notification from './Notification'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  message
}) => {
  return (
    <div>
      <h1>Log in to application</h1>
      <Notification message={message}/>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm