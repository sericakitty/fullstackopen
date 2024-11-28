import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

// example tests for Togglable component
describe('<Togglable /> component', () => {
  let container;

  beforeEach(() => {
    // render the Togglable component with a button label and a div as children before each test
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test('renders its children', () => {
    // check that the children are rendered
    screen.getByText('togglable content');
  });

  test('at start the children are not displayed', () => {
    // check that the children are not displayed
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', async () => {
    // check that the children are displayed after clicking the button
    const user = userEvent.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', async () => {
    // check that the children can be closed
    const user = userEvent.setup();

    const button = screen.getByText('show...');
    await user.click(button);

    const closeButton = screen.getByText('cancel');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
