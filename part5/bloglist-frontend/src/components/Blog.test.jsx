import { render, screen } from '@testing-library/react';
import { beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog component', () => {
  let blog;
  let user;
  let mockHandler;

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5,
      user: {
        username: 'testUser',
        id: '12345',
      },
    };

    user = {
      username: 'testUser',
      id: '12345',
    };

    mockHandler = vi.fn();
  });

  // 5.13
  test('renders title and author but not url or likes by default', () => {
    render(<Blog blog={blog} updateBlogLikes={mockHandler} user={user} />);
    expect(screen.getByText(`${blog.title} ${blog.author}`)).toBeDefined();
  });

  // 5.14
  test('renders url and likes when view button is clicked', async () => {
    render(<Blog blog={blog} updateBlogLikes={mockHandler} user={user} />); // renders the blog component

    const eventUser = userEvent.setup();

    const button = screen.getByText('view'); // gets the view button
    eventUser.click(button); // clicks the view button

    expect(screen.getByText(blog.url)).toBeDefined(); // expects the url to be displayed
    expect(screen.getByText(`likes ${blog.likes}`)).toBeDefined(); // expects the likes to be displayed
    expect(screen.getByText(blog.author)).toBeDefined(); // expects the author to be displayed
  });

  // 5.15
  test('clicking the like button twice calls the event handler twice', async () => {
    render(<Blog blog={blog} updateBlogLikes={mockHandler} user={user} />);

    const eventUser = userEvent.setup();

    // first click on view button
    const viewButton = screen.getByText('view');
    await eventUser.click(viewButton);

    // get the like button and click it twice
    const likeButton = screen.getByText('like');
    await eventUser.click(likeButton);
    await eventUser.click(likeButton);

    // expects the mock handler to be called twice
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
