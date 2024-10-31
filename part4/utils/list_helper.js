// 4.3 - 4.7 tests
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (favorite.likes < blog.likes) {
      favorite = blog
    }
    return favorite
  })
}

const mostBlogs = (blogs) => {
  let AuthorWithMostBlogs = blogs[0].author
  let mostBlogcount = 0

  blogs.forEach(blog1 => {
    let count = 0
    blogs.forEach(blog2 => {
      if (blog1.author === blog2.author) {
        count++
      }
    })
    if (count > mostBlogcount) {
      mostBlogcount = count
      AuthorWithMostBlogs = blog1.author
    }
  })

  return {
    author: AuthorWithMostBlogs,
    blogs: mostBlogcount
  }
}

const mostLikes = (blogs) => {
  let AuthorWithMostLikes = blogs[0].author
  let mostLikescount = 0

  blogs.forEach(blog1 => {
    let count = 0
    blogs.forEach(blog2 => {
      if (blog1.author === blog2.author) {
        count += blog2.likes
      }
    })
    if (count > mostLikescount) {
      mostLikescount = count
      AuthorWithMostLikes = blog1.author
    }
  })

  return {
    author: AuthorWithMostLikes,
    likes: mostLikescount
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}