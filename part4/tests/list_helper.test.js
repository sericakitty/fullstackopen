// 4.3 - 4.7 tests
const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
  {
    title: 'testi title',
    author: 'testaaja kissa',
    url: 'www.kissa.fi',
    likes: 5,
  }
]

const listWithMultipleBlogs = [
  {
    title: 'testi title1',
    author: 'testaaja kissa',
    url: 'www.kissa.fi',
    likes: 5,
  },
  {
    title: 'testi title2',
    author: 'testaaja kissa',
    url: 'www.kissa.fi',
    likes: 20,
  },
  {
    title: 'testi title3',
    author: 'testaaja kissa',
    url: 'www.kissa.fi',
    likes: 15,
  },
  {
    title: 'testi title4',
    author: 'testaaja koira',
    url: 'www.koira.fi',
    likes: 10,
  },
  {
    title: 'testi title5',
    author: 'testaaja koira',
    url: 'www.koira.fi',
    likes: 20,
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {


  test('of empty list is zero', () => {

    const result = listHelper.totalLikes(emptyList)

    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {

    const result = listHelper.totalLikes(listWithOneBlog)

    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {

    const result = listHelper.totalLikes(listWithMultipleBlogs)
    const expectedTotalLikes = listWithMultipleBlogs.reduce((sum, blog) => sum + blog.likes, 0)

    expect(result).toBe(expectedTotalLikes)
  })
})

describe('favorite blog', () => {

  test('most liked blog', () => {

    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    const expectedMostFavoritedBlog = listWithMultipleBlogs[1]

    expect(result).toEqual(expectedMostFavoritedBlog)
  })

  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)

    const expectedAuthor = {
      author: 'testaaja kissa',
      blogs: 3
    }

    expect(result).toEqual(expectedAuthor)
  })

  test('author with most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)

    const expectedAuthor = {
      author: 'testaaja kissa',
      likes: 40
    }

    expect(result).toEqual(expectedAuthor)

  })

})