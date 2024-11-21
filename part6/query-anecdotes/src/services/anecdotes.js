import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

// 6.20 - fetch all anecdotes from backend
const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch anecdotes');
  }
};

// 6.21 - create a new anecdote on backend
const createAnecdote = async (newAnecdote) => {
  try {
    const response = await axios.post(baseUrl, newAnecdote);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create anecdote');
  }
}

// 6.22 - update an anecdote on backend, for voting
const updateAnecdote = async (updatedAnecdote) => {
  try {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update anecdote');
  }
};

export default { getAnecdotes, createAnecdote, updateAnecdote };
