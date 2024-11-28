import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'; // 7.20, 7.21 - import Table and Button from react-bootstrap
import { useState } from 'react';

const Blog = ({ blog, handleUpdateBlogLikes, handleDeleteBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const deleteFunction = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDeleteBlog(blog);
    }
  };

  const likeFunction = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    handleUpdateBlogLikes(blog.id, updatedBlog);
  };

  return (
    <div data-testid={`blog-id-${blog.id}`} className="blog-container">
      <Table striped bordered hover size="sm" className="custom-table">
        <colgroup>
          <col style={{ width: '40%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {/* blog name is a link to the blog detail page */}
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>{blog.author}</td>
            <td>
              <Button
                variant="info"
                size="sm"
                onClick={() => setDetailsVisible(!detailsVisible)}
              >
                {detailsVisible ? 'Hide' : 'View'}
              </Button>
            </td>
            <td>
              {user?.username === blog.user?.username && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={deleteFunction}
                >
                  Remove
                </Button>
              )}
            </td>
          </tr>
          {detailsVisible && (
            <tr>
              <td colSpan="4">
                <div>
                  <p>
                    <strong>URL:</strong> {blog.url}
                  </p>
                  <p>
                    <strong>Likes:</strong> {blog.likes}{' '}
                    <Button
                      variant="success"
                      size="sm"
                      onClick={likeFunction}
                    >
                      Like
                    </Button>
                  </p>
                  <p>
                    <strong>Added by:</strong> {blog.user?.name || 'Unknown'}
                  </p>

                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Blog;
