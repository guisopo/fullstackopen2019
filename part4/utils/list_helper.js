const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = []
  const reducer = (acumulator, currentValue) => acumulator + currentValue
  
  blogs.map(blog => likes.push(blog.likes))
  return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
  let likesArray = blogs.map(blog => blog.likes)
  const favoriteIndex = likesArray.indexOf(Math.max(...likesArray))
  return blogs[favoriteIndex]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}