import { useSelector, useDispatch } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import { vote } from '../reducers/anecdoteReducer';

// 6.8 - AnecdoteList component
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // 6.5 - sort the anecdotes by votes in descending order
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote)); // dispatch thunk for voting
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5)); // 6.13, 6.19 - show notification, timeout 5 seconds
  };


  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};


export default AnecdoteList;
