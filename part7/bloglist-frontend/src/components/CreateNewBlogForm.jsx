import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // 7.20, 7.21 - import Bootstrap components

const CreateNewBlogForm = ({ handleCreateNewBlog }) => {
  // state for new blog form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    handleCreateNewBlog({
      // sends new blog data to parent component to create new blog, this is an argument to the function
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className="create-new-blog-container">
      <Form onSubmit={addBlog}>
        <h2>Create New Blog</h2>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            data-testid="title-input"
            type="text"
            value={title}
            name="Title"
            aria-label="title"
            placeholder="Enter blog title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            data-testid="author-input"
            type="text"
            value={author}
            name="Author"
            aria-label="author"
            placeholder="Enter author name"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL:</Form.Label>
          <Form.Control
            data-testid="url-input"
            type="text"
            value={url}
            name="Url"
            aria-label="url"
            placeholder="Enter blog URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button data-testid="submit-new-blog-button" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateNewBlogForm;
