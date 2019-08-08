import React, { useState, useEffect } from 'react';
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(initalBlogs => {
        setBlogs(initalBlogs)
      })
  }, [user])

  const handleLogging = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogging}>
        <div>
          username:
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const userProfile = () => (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in</p>
      <ul>
        {
          blogs.map(b => <li key={b.id}>{b.title}</li>)
        }
      </ul>
    </div>
  )

  return (
    <div>
      {
        user === null ?
          loginForm() :
          userProfile()
      }
    </div>
  )
}

export default App;
