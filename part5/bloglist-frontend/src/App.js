import React, { useState, useEffect } from 'react';

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initalBlogs => {
        setBlogs(initalBlogs)
      })
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setMessage(null)
      }, 4500)
    }
  }

  const loginForm = () => {
    return (
      <LoginForm 
        username={username}
        password={password}
        message={message}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (event) => {
    event.preventDefault();

    if (!(title && author && url)) {
      setMessage('Failed to create new Blog. You must fill every input from the form')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }

    const newBlog = {
      title,
      author,
      url
    }

    blogService
      .createBlog(newBlog, user.token)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })

    setMessage(`New Blog ${newBlog.title} Added!`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const userProfile = () => (
    <div>
      <h1>Blogs</h1>

      <Notification message={message}/>
      
      <p>{user.name} logged in</p>
      <button onClick={() => logOut()}>logout</button>

      <h1>Create new</h1>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>

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
