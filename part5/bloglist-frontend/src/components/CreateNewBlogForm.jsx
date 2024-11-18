import React from 'react';
import { useState } from 'react';

// 5.3 - create new blog form
const CreateNewBlogForm = ({ handleCreateNewBlog }) => {
  // 5.6 state for new blog form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    // 5.6
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
    <div>
      <div>
        <form onSubmit={addBlog}>
          <h2>create new</h2>
          <div>
            title:
            <input
              data-testid="title-input"
              type="text"
              value={title}
              name="Title"
              aria-label="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              data-testid="author-input"
              type="text"
              value={author}
              name="Author"
              aria-label="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              data-testid="url-input"
              type="text"
              value={url}
              name="Url"
              aria-label="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button data-testid="submit-new-blog-button" type="submit">
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewBlogForm;
