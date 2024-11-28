// 7.16 - BlogDetail to show single blog details
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const BlogDetail = ({ blogs, handleUpdateBlogLikes, handleAddComment }) => {
  const { id } = useParams(); // get blog id from the URL
  const blog = blogs.find((blog) => blog.id === id); // find the blog with the id from the URL

  const [newComment, setNewComment] = useState('');

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const likeFunction = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    handleUpdateBlogLikes(blog.id, updatedBlog);
  };

  // 7.19 - Add comment functionality
  const commentFunction = (event) => {
    event.preventDefault();
    const updatedBlog = { ...blog, comments: blog.comments.concat(newComment) };
    handleAddComment(blog.id, updatedBlog, newComment);
    setNewComment('');
  };

  return (
    <div className="blog-detail-container">
      <h2>{blog.title}</h2>
      <p>
        <strong>Author:</strong> {blog.author}
      </p>
      <p>
        <strong>URL:</strong>{' '}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>
        <strong>Likes:</strong> {blog.likes}{' '}
        <Button variant="success" size="sm" onClick={likeFunction}>
          Like
        </Button>
      </p>
      <p>
        <strong>Added by:</strong> {blog.user?.name || 'Unknown'}
      </p>

      {/* 7.18 - comments */}
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      {/* 7.19 - comment form */}
      <Form onSubmit={commentFunction}>
        <Form.Group controlId="newComment">
          <Form.Label>Add a comment</Form.Label>
          <Form.Control
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment"
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
          Add Comment
        </Button>
      </Form>
    </div>
  );
};

export default BlogDetail;
