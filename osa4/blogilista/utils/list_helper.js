const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => (likes += blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
      return
  } else {
    const likeArr = blogs.map((blog) => blog.likes)
    const favorite = Math.max(...likeArr)
    const favoriteBlog = blogs.find((blog) => blog.likes === favorite)

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
  }
}
const mostBlogs = (blogs) => {
  return _(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author: author, blogs: blogs }))
    .maxBy('blogs')
}

const mostLikes = blogs => {
  return _(blogs)
    .groupBy('author')
    .map((blog, author) => ({ author: author, likes: _.sumBy(blog, 'likes') }))
    .maxBy('likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
