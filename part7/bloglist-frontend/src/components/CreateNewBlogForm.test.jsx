import { render, screen } from '@testing-library/react';
import { beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import CreateNewBlogForm from './CreateNewBlogForm';

describe('CreateNewBlogForm component', () => {
  let mockHandler;

  beforeEach(() => {
    mockHandler = vi.fn();
  });

  test('create new blog form calls event handler with correct data', async () => {
    render(<CreateNewBlogForm handleCreateNewBlog={mockHandler} />);

    // start the userEvent setup session
    const eventUser = userEvent.setup();

    const title = screen.getByLabelText('title');
    const author = screen.getByLabelText('author');
    const url = screen.getByLabelText('url');

    // using userEvent to type in the input fields
    await eventUser.type(title, 'Test Title');
    await eventUser.type(author, 'Test Author');
    await eventUser.type(url, 'http://testaaja.com');

    const submitButton = screen.getByRole('button', { name: /create/i });
    await eventUser.click(submitButton);

    expect(mockHandler).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://testaaja.com',
    });
  });
});
