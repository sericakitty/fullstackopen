import './App.css';
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import { useSelector, useDispatch } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import {
  initializeBlogsAsync,
  createBlogAsync,
  updateBlogAsync,
  commentBlogAsync,
  deleteBlogAsync,
} from './reducers/blogReducer';
import { loginAsync, setUser } from './reducers/loginReducer';
import LoginForm from './components/LoginForm';
import CreateNewBlogForm from './components/CreateNewBlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import BlogDetail from './components/BlogDetail';

import { Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const newBlogFormRef = useRef();

  const fetchBlogs = () => {
    dispatch(initializeBlogsAsync());
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser'); // get logged in user from local storage
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      if (loggedUser?.token) {
        dispatch(setUser(loggedUser));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && user.token) {
      // check if user is logged in before fetching blogs
      fetchBlogs();
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await dispatch(loginAsync({ username, password }));
      dispatch(setUser(loggedUser));
      setUsername('');
      setPassword('');
      dispatch(showNotification('logged in successfully'));
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'error'));
    }
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    setUsername('');
    setPassword('');
    dispatch(showNotification('logged out successfully'));
  };

  const handleCreateNewBlog = async (newBlogObject) => {
    try {
      newBlogFormRef.current.toggleVisibility();
      const blogToSave = {
        ...newBlogObject,
        user: { username: user.username, id: user.id },
      };
      dispatch(createBlogAsync(blogToSave));
      dispatch(
        showNotification(`a new blog ${newBlogObject.title} by ${newBlogObject.author} added`)
      );
    } catch (exception) {
      dispatch(showNotification('failed to create new blog', 'error'));
    }
  };

  const handleUpdateBlogLikes = async (id, updatedBlog) => {
    try {
      dispatch(updateBlogAsync(id, updatedBlog));
      dispatch(showNotification(`Liked blog ${updatedBlog.title} by ${updatedBlog.author}`));
    } catch (error) {
      dispatch(showNotification('Failed to update likes', 'error'));
    }
  };

  // 7.19 - Add comment functionality
  const handleAddComment = async (id, updatedBlog, newComment) => {
    try {
      dispatch(commentBlogAsync(id, newComment));
      dispatch(
        showNotification(`Comment added to blog ${updatedBlog.title} by ${updatedBlog.author}`)
      );
    } catch (error) {
      dispatch(showNotification('Failed to add comment', 'error'));
    }
  };

  const handleDeleteBlog = (blog) => {
    try {
      dispatch(deleteBlogAsync(blog.id));
      dispatch(showNotification(`Deleted blog ${blog.title} by ${blog.author}`));
    } catch (exception) {
      dispatch(showNotification('Failed to delete blog', 'error'));
    }
  };

  const blogShow = () => (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdateBlogLikes={handleUpdateBlogLikes}
          handleDeleteBlog={handleDeleteBlog}
          user={user}
        />
      ))}
    </>
  );

  return (
    <div className="container">
      <div className="text-center">
        <Notification />
      </div>

      <Router>
        <Routes>
          {/* Login route */}
          <Route
            path="/login"
            element={
              user === null ? (
                <div>
                  <LoginForm
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                    setUsername={setUsername}
                    setPassword={setPassword}
                  />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Main app routes */}
          <Route
            path="/"
            element={
              user ? (
                <>
                  <NavBar user={user} handleLogout={handleLogout} />
                  <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
                    <CreateNewBlogForm handleCreateNewBlog={handleCreateNewBlog} />
                  </Togglable>
                  {blogShow()}
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Blog detail route */}
          <Route
            path="/blogs/:id"
            element={
              user ? (
                <>
                  <NavBar user={user} handleLogout={handleLogout} />
                  <BlogDetail
                    blogs={blogs}
                    handleUpdateBlogLikes={handleUpdateBlogLikes}
                    handleAddComment={handleAddComment}
                  />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Users route */}
          <Route
            path="/users"
            element={
              user ? (
                <>
                  <NavBar user={user} handleLogout={handleLogout} />
                  <UserList />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* User detail route */}
          <Route
            path="/users/:id"
            element={
              user ? (
                <>
                  <NavBar user={user} handleLogout={handleLogout} />
                  <UserDetail />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
