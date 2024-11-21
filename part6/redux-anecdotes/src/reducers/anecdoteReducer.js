import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes'; // backend communication

// 6.10 - create a slice for the anecdotes
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [], // initially empty, data fetched from the backend
  reducers: {
    setAnecdotes(state, action) {
      // 6.14 - update the state with the new anecdotes from the server
      return action.payload;
    },
    appendAnecdote(state, action) {
      // 6.14 - append the new anecdote to the state
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      // 6.3, 6.6, 6.11 - vote for anecdote
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
    },
  },
});

// action creators for synchronous reducers
export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

// 6.14, 6.16 - thunk for initializing anecdotes from backend to Redux store
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll(); // fetch from backend
    dispatch(setAnecdotes(anecdotes)); // set to Redux store
  };
};

// 6.15, 6.17 - thunk for creating a new anecdote
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content); // add to backend
    dispatch(appendAnecdote(newAnecdote)); // add to Redux store
  };
};

// 6.18 - update the votes for an anecdote
export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const returnedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, updatedAnecdote);
    dispatch(voteAnecdote(returnedAnecdote)); // update the Redux store
  };
};

export default anecdoteSlice.reducer; // export the reducer

