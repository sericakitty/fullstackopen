// 7.11, 7.12 blog reducer
import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog));
    },
    commentBlog(state, action) {
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog));
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    initializeBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { createBlog, updateBlog, deleteBlog, commentBlog, initializeBlogs } = blogSlice.actions;

// Thunk functions
export const initializeBlogsAsync = () => {
  // 7.11
  return async (dispatch, getState) => {
    const token = getState().login?.token;
    if (!token) {
      throw new Error('No token found');
    }
    const blogs = await blogService.getAll(token);
    dispatch(initializeBlogs(blogs));
  };
};

export const createBlogAsync = (newBlogObject) => {
  // 7.11
  return async (dispatch, getState) => {
    const token = getState().login?.token;
    if (!token) {
      throw new Error('No token found');
    }
    const blog = await blogService.createBlog(newBlogObject, token);
    blog.user = newBlogObject.user; // Add user to new blog object
    dispatch(createBlog(blog));
  };
};

export const updateBlogAsync = (id, updatedBlog) => {
  // 7.12
  return async (dispatch, getState) => {
    const token = getState().login?.token;
    if (!token) {
      throw new Error('No token found');
    }
    const blog = await blogService.updateBlog(id, updatedBlog, token);
    blog.user = updatedBlog.user; // Add user to updated blog object
    dispatch(updateBlog(blog));
  };
};

export const commentBlogAsync = (id, comment) => {
  // 7.19
  return async (dispatch, getState) => {
    const token = getState().login?.token;
    if (!token) {
      throw new Error('No token found');
    }
    const blog = await blogService.commentBlog(id, comment, token);
    dispatch(commentBlog(blog));
  };
}

export const deleteBlogAsync = (id) => {
  // 7.12
  return async (dispatch, getState) => {
    const token = getState().login?.token;
    if (!token) {
      throw new Error('No token found');
    }
    await blogService.deleteBlog(id, token);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
