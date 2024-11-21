import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => { // 6.14 - fetch anecdotes from the backend when the app is loaded, using the initializeAnecdotes action creator
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App
