const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = []
  const reducer = (acumulator, currentValue) => acumulator + currentValue
  
  blogs.map(blog => likes.push(blog.likes))
  return likes.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes
}