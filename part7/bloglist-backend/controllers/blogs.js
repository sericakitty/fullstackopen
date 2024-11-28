// bloglist
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(Array.isArray(blogs) ? blogs : []); // make sure response is an array
  } catch (error) {
    next(error); // handle errors with next
  }
});

// new blog post
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  // find user by id, using decodedToken
  const user = request.user; // get user from request object (set by userExtractor)

  // if user not found, return error
  if (!user) {
    return response.status(400).json({ error: 'User not found' });
  }

  // check if title or url is missing
  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing',
    });
  }

  // create a new blog entry with data from request body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id, // 4.19 - set user field to user's id from token, no need to send user field in request
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id); // update user's blogs with the new blog's id
    await user.save(); // save updated user
    response.status(200).json(savedBlog); // send saved blog as response
  } catch (error) {
    next(error); // handle errors with next
  }
});

// delete blog, check if user is authorized
blogsRouter.delete('/:id', async (request, response, next) => {
  const user = request.user; // get user from request object (set by userExtractor)

  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' }); // return 404 if blog does not exist
    }

    // check if user is authorized to delete blog
    if (blog.user && blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end(); // success, no content to return
    } else {
      return response.status(403).json({
        error: 'Forbidden: You do not have permission to delete this blog',
      }); // user unauthorized to delete
    }
  } catch (error) {
    next(error); // handle errors with next
  }
});

// update blog
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    // creating new blog with updated likes
    likes: body.likes,
  };

  try {
    // try to update blog
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog); // send updated blog as response
  } catch (error) {
    next(error); // handle errors with next
  }
});



// 7.18 - add comment to blog
blogsRouter.post('/:id/comments', async (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.comments = blog.comments.concat(comment);
    const updatedBlog = await blog.save();

    // populate the user field before sending the response
    const populatedBlog = await Blog.findById(updatedBlog.id).populate('user', {
      name: 1,
      username: 1,
    });

    res.status(201).json(populatedBlog);
  } catch (error) {
    next(error);
  }
});


module.exports = blogsRouter;
