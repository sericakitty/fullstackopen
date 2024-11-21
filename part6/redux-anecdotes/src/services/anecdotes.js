// 6.14 - anecdotesService
import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching anecdotes');
  }
};

const createNew = async (content) => {
  try {
    const response = await axios.post(baseUrl, { content, votes: 0 }); // new anecdote object with content and 0 votes
    return response.data;
  }
  catch (error) {
    throw new Error('An error occurred while creating a new anecdote');
  }
};

const updateAnecdote = async (id, updatedAnecdote) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while updating the anecdote');
  }
};

export default { getAll, createNew, updateAnecdote };
