import React from 'react'

const BlogForm = ({
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleSubmit
}) => {
  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>s
    </div>
  )
}

export default BlogForm