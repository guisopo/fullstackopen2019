import React, {useState} from 'react'
const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogInformation = () => {
    if (visible) {
      return (
        <React.Fragment>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{blog.likes} likes <button>like</button></p>
          <p>Added by {blog.author}</p>
        </React.Fragment>
      )
    }
    return
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title} by {blog.author}
        {blogInformation()}
      </div>
    </div>
  )
}

export default Blog