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

  let authorsProfiles = []

  names.forEach(name => {
    const author = authorsProfiles.find(singleProfile => singleProfile.author === name)
    !author
      ? authorsProfiles.push({'author': name, 'blogs': 1})
      : author.blogs += 1
  })

  authorsProfiles.sort((a, b) => b.blogs - a.blogs)

  return authorsProfiles[0]
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => [blog.author, blog.likes])
  let authorsProfiles = []

  authors.forEach(author => {
    const findAuthor = authorsProfiles.find(singleProfile => singleProfile.author === author[0])
    !findAuthor
      ? authorsProfiles.push({'author': author[0], 'likes': author[1]})
      : findAuthor.likes += author[1]
  })

  authorsProfiles.sort((a, b) => b.likes - a.likes)

  return authorsProfiles[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}