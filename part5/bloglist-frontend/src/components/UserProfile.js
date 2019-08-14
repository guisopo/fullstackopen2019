import React from 'react'
import Notification from './Notification'

const UserProfile = ({
  blogs,
  user,
  message,
  title,
  author,
  url,
  handleClick,
  handleSubmit,
  handleChange,
}) => {
  return (
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
}