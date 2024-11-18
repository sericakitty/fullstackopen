import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

import LoginForm from './components/LoginForm'; // import components
import CreateNewBlogForm from './components/CreateNewBlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]); // blogs state
  const [username, setUsername] = useState(''); // username state for login form
  const [password, setPassword] = useState(''); // password state for login form
  const [user, setUser] = useState(null); //  5.1 - user state
  const [errorMessage, setErrorMessage] = useState(null); // error message state
  const [successMessage, setSuccessMessage] = useState(null); // 5.4 - success message state

  // 5.5
  const newBlogFormRef = useRef();

  // function to fetch blogs
  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll(); // fetch blogs from backend

      blogs.sort((a, b) => b.likes - a.likes); // 5.10 - sort blogs by likes

      setBlogs(blogs);
    } catch (error) {
      console.error('Failed to fetch blogs', error);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON); // get user from localStorage
      setUser(user); // set user to state
      blogService.setToken(user.token); // set token with user token to be able to create new blogs
    }
    fetchBlogs(); // fetch blogs on component mount
  }, []);

  // 5.1, 5.2 - login function
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        // login user with username and password
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user)); // 5.2 - save user to localStorage
      setUser(user); // set user to state
      blogService.setToken(user.token); // after login set token for user to be able to create new blogs
      setUsername(''); // clear username field in login form
      setPassword(''); // clear password field in login form
      setErrorMessage(null); // clear error message
      setSuccessMessage('logged in successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      fetchBlogs(); // fetch blogs after login
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // 5.2 - logout function
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser'); // clear user from localStorage
    setUser(null);
    blogService.setToken(null); // clear token for user

    setSuccessMessage('logged out successfully');
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  // 5.3 - create new blog handler
  const handleCreateNewBlog = async (newBlogObject) => {
    try {
      newBlogFormRef.current.toggleVisibility(); // 5.5 - close form after creating new blog

      // add user to new blog object
      const blogToSave = {
        ...newBlogObject,
        user: { username: user.username, id: user.id },
      };

      const blog = await blogService.createBlog(blogToSave);

      setBlogs(
        blogs.concat(blog).sort((a, b) => b.likes - a.likes) // 5.10 - sort blogs by likes
      );

      blog.user = { username: user.username, id: user.id };

      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('blog creation failed');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // 5.8 - update blog likes
  const updateBlogLikes = async (id, updatedBlog) => {
    try {
      const blog = await blogService.updateBlog(id, updatedBlog);

      setBlogs(
        blogs
          .map((b) => (b.id === id ? blog : b))
          .sort((a, b) => b.likes - a.likes) // 5.10 - sort blogs by likes after updating
      );
    } catch (error) {
      setErrorMessage('Failed to update likes');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // blog show
  const blogShow = () => (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogLikes={updateBlogLikes}
          user={user}
        />
      ))}
    </>
  );

  // user show
  const userShow = () => (
    <div>
      <p>{user.name} logged in</p>
      <button data-testid="logout-button" onClick={handleLogout}>
        logout
      </button>
    </div>
  );

  // conditional rendering of login form or blog form based on user state
  return (
    <>
      {user === null ? <h2>log in to application</h2> : <h2>blogs</h2>}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <>
          {userShow()}

          <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
            <CreateNewBlogForm handleCreateNewBlog={handleCreateNewBlog} />
          </Togglable>

          {blogShow()}
        </>
      )}
    </>
  );
};

export default App;
