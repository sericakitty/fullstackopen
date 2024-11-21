import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

// 6.7 - AnecdoteForm component
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  // 6.4 - add new anecdote
  const createAnecdoteHandler = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content === '' || content === null || content.length <= 4) { // I added basic validation to prevent too short anecdotes
      dispatch(showNotification('Anecdote must be at least 5 characters long', 5, 'error')); // 6.13 - show notification, timeout 5 seconds
      return;
    }

    event.target.anecdote.value = '';
    dispatch(createAnecdote(content)); // 6.6 - using action creator to create new anecdote
    dispatch(showNotification(`You created '${content}'`, 5)); // 6.13 - show notification, timeout 5 seconds
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdoteHandler}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
