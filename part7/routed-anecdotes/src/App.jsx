import { useState } from 'react';
import {
  // 7.1
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// 7.2

// make separate components for clarity
import Menu from './components/Menu';
import About from './components/About';
import Footer from './components/Footer';
import CreateNew from './components/CreateNew';
import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote';
import { NotificationProvider } from './components/Notification'; // 7.3 - notification

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    // handler for adding new anecdote
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    // 7.1 - router
    <>
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu />

          {/* 7.3 notification */}
          <NotificationProvider>
            <Routes>
              {/* 7.2 - link to anecdote */}
              <Route
                path="/anecdotes/:id"
                element={<Anecdote anecdotes={anecdotes} />}
              />

              <Route
                path="/anecdotes"
                element={<AnecdoteList anecdotes={anecdotes} />}
              />
              <Route
                path="/create-new"
                element={<CreateNew addNew={addNew} />}
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/"
                element={<AnecdoteList anecdotes={anecdotes} />}
              />
            </Routes>
          </NotificationProvider>

          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
