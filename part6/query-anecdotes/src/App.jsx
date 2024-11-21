import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import ShowAnecdotes from './components/ShowAnecdotes';

const App = () => {
  return (
    <>
      <h3>Anecdote app</h3>
      <Notification /> {/* 6.23 - component that displays notifications */}
      <AnecdoteForm />
      <ShowAnecdotes /> {/* component that displays anecdotes, to simplify the App component */}
    </>
  );
};

export default App;
