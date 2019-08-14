import React, { useState, useEffect } from 'react';

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import Blog from './components/Blog'

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

    blogFormRef.current.toggleVisibility()

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

  const updateLikes = (target) => {
    const newBlog = {
      likes: target.likes + 1
    }

    blogService
      .updateBlog(target.id, newBlog, user.token)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === returnedBlog.id ? returnedBlog : b))
      })

    setMessage('Updated Likes!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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

  const blogFormRef = React.createRef()

  const userProfile = () => (
    <div>
      <h1>Blogs</h1>

      <Notification message={message}/>
      
      <p>{user.name} logged in</p>
      <button onClick={() => logOut()}>logout</button>
      
      <Toggable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleSubmit={createBlog}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Toggable>

      <ul>
        {
          blogs.map(b => <Blog blog={b} key={b.id} handleClick={() => updateLikes(b)}/>)
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
