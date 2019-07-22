const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (acumulator, currentValue) => acumulator + currentValue

  let likes = blogs.map(blog => blog.likes)
  
  return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  let likesArray = blogs.map(blog => blog.likes)

  const favoriteIndex = likesArray.indexOf(Math.max(...likesArray))

  return blogs[favoriteIndex]
}

const mostBlogs = (blogs) => {
  const names = blogs.map(blog => blog.author)

  let authorsProfile = []

  names.forEach(authorName => {
    const author = authorsProfile.find(author => author.author === authorName)
    !author
      ? authorsProfile.push({'author': authorName, 'blogs': 1})
      : author.blogs += 1
  })

  authorsProfile.sort((a, b) => b.blogs - a.blogs)

  return authorsProfile[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}