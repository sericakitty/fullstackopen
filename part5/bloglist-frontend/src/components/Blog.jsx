import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlogLikes, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // 5.11 - handle delete function
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id);
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete blog', error);
      }
    }
  };

  const [detailsVisible, setDetailsVisible] = useState(false);

  // 5.8 - like button handler
  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    updateBlogLikes(blog.id, updatedBlog); // use the prop function to update likes
  };

  return (
    <div data-testid={`blog-id-${blog.id}`} style={blogStyle}>
      <div data-testid="blog-title-author">
        {blog.title} {blog.author}
        <div style={{ display: detailsVisible ? '' : 'none' }}>
          <p data-testid="blog-url">{blog.url}</p>
          <p data-testid="blog-likes">
            likes {blog.likes}
            <button data-testid="like-blog-button" onClick={handleLike}>
              like
            </button>
          </p>
          <p data-testid="blog-author">{blog.author}</p>
        </div>
      </div>
      <button
        data-testid="view-blog-details-button"
        onClick={() => setDetailsVisible(!detailsVisible)}
      >
        {detailsVisible ? 'hide' : 'view'}
      </button>

      {/* 5.11 - show button only if blog was created by the logged-in user */}
      {user?.username === blog.user?.username && (
        <button data-testid="delete-blog-button" onClick={handleDelete}>
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;
