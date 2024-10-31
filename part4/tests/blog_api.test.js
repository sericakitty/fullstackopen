const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token = null

const initialblogs = [
  {
    title: 'HTML is easy',
    author: 'testaaja kissa',
    url: 'www.testi.fi',
    likes: 5,
    id: '5f7b3b3b7f3b3b3b3b3b3b3b',
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'testaaja koira',
    url: 'www.testi-testi.fi',
    likes: 10,
    id: '5f7b3b3b7f3b3b3b3b3b3b3c',
  },
]


beforeEach(async () => {
  // clear database
  await User.deleteMany({});
  await Blog.deleteMany({});

  // test user
  const testUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password123',
  };

  // create a user and get user ID
  const userResponse = await api.post('/api/users').send(testUser);
  const userId = userResponse.body.id;

  // 4.23 - get auth token
  const loginResponse = await api
    .post('/api/login')
    .send({ username: testUser.username, password: testUser.password });

  token = loginResponse.body.token;

  // add user ID to blogs and create blogs in database
  const initialBlogsWithUser = initialblogs.map(blog => ({ ...blog, user: userId }));
  await Blog.insertMany(initialBlogsWithUser);

}, 20000);



// --- GET ---

describe('GET-request tests:', () => {
  test('Blogs are returned as json', async () => {
    const res = await api
      .get('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(Array.isArray(res.body)).toBe(true)
  })


  test('Blogs are returned with id field', async () => {
    const res = await api
      .get('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(Array.isArray(res.body)).toBe(true) // check if body is an array

    res.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

// --- POST ---

describe('POST-request tests:', () => {
  test('One blog is added to the database', async () => {
    const testBlog = {
      title: 'Testi',
      author: 'Testaaja',
      url: 'www.testi.fi',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('If no likes, initialize to 0', async () => {
    const testBlog = {
      title: 'Testi',
      author: 'Testaaja',
      url: 'www.testi.fi',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(testBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('If no title or url, return 400', async () => {
    const testBlogWithNoTitle = {
      author: 'Testaaja',
      url: 'www.testi.fi',
      likes: 5,
    }

    const testBlogWithNoUrl = {
      title: 'Testi',
      author: 'Testaaja',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(testBlogWithNoTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(testBlogWithNoUrl)
      .expect(400)
  })
})


// --- DELETE ---

describe('DELETE-request tests:', () => {
  test('One blog is deleted from the database', async () => {
    // get all blogs
    const res = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // get the first blog id
    const blogToDelete = res.body[0].id;

    // delete the blog; blog has to be deleted by the user who created it
    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    // Get all blogs after delete
    const resAfterDelete = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    // Check if the length of blogs is one less than initial
    expect(resAfterDelete.body).toHaveLength(initialblogs.length - 1);
  });
});



// --- PUT ---
describe('PUT-request test:', () => {
  test('Likes are updated', async () => {
    const res = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .expect('Content-Type', /application\/json/)


    const blogToUpdate = res.body[0].id

    const updatedBlog = {
      likes: 111
    }

    await api
      .put(`/api/blogs/${blogToUpdate}`)
      .set('Authorization', 'bearer ' + token)
      .send(updatedBlog)
      .expect(200)

    const resAfterUpdate = await api
    .get('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const updatedBlogAfterUpdate = resAfterUpdate.body.find(blog => blog.id === blogToUpdate)

    expect(updatedBlogAfterUpdate.likes).toBe(111)

  })
})


// 4.16 - user validation

describe('User validation tests:', () => {
  test('If password is less than 3 characters, return 400', async () => {
    const testUser = {
      username: 'testi',
      name: 'Testi Henkilo',
      password: 'TE',
    }

    await api.post('/api/users').send(testUser).expect(400)
  })

  test('If username is less than 3 characters, return 400', async () => {
    const testUser = {
      username: 'te',
      name: 'Testi Henkilo',
      password: 'TEE',
    }

    await api.post('/api/users').send(testUser).expect(400)
  })
})

// mongoose connection close after tests
afterAll(async () => {
  await mongoose.connection.close()
})


