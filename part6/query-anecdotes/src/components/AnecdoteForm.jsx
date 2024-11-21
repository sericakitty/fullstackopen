import { useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdotes';
import {
  useSetNotification,
  useClearNotification,
} from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const setNotification = useSetNotification(); // 6.23 - notification context dispatch
  const clearNotification = useClearNotification(); // 6.23 - notification context dispatch

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createAnecdote, // 6.21 - add new anecdote
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']); // get existing anecdotes from cache
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote)); // update the cache with the new anecdote

      setNotification(
        `Anecdote "${newAnecdote.content}" created successfully!`
      ); // 6.23 - set notification
      setTimeout(() => {
        clearNotification(); // 6.23 - clear the notification after 5 seconds
      }, 5000);
    },
    onError: () => {
      setNotification(
        'Too short! Anecdote must be at least 5 characters long.',
        'error'
      ); // 6.24 - error message
      setTimeout(() => {
        clearNotification(); // clear the notification after 5 seconds
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value; // extract anecdote content from the form
    event.target.anecdote.value = ''; // clear the input field

    if (content.length < 5) { // json server custom configuration didn't work so validating here. configuration settings were deprecated
      setNotification(
        'Too short! Anecdote must be at least 5 characters long.',
        'error'
      ); // 6.24 - error message
      setTimeout(() => {
        clearNotification(); // clear the notification after 5 seconds
      }, 5000);
      return;
    }

    // send the new anecdote to the backend
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
