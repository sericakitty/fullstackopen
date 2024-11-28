import {
  // 7.1, 7.2
  useParams,
} from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {

  // 7.2 - link to anecdote
  const id = useParams().id;

  // find anecdote by id
  const anecdote = anecdotes.find((a) => a.id === Number(id));

  // single anecdote by id
  if(anecdote) {
    return (
      <>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>
          for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </p>
      </>
    );
  }
}

export default Anecdote;