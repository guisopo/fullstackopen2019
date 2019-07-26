const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }
]

const singleBlog = {
  title: "This is a new blog",
  author: "Gossip Blogger",
  url: "https://reactpatterns.com/",
  likes: 7,
}

const noLikesBlog = {
  title: "This is a new blog",
  author: "Gossip Blogger",
  url: "https://reactpatterns.com/",
}

const noTitleNoUrlBlog = {
  author: "Gossip Blogger",
  likes: 7,
}

module.exports = {
  initialBlogs,
  singleBlog,
  noLikesBlog,
  noTitleNoUrlBlog
}