// import necessary hooks and services
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdotes';
import {
  useSetNotification,
  useClearNotification,
} from '../contexts/NotificationContext';

// 6.20 - ShowAnecdotes component to display the list of anecdotes
const ShowAnecdotes = () => {
  const queryClient = useQueryClient(); // react query client for managing cache
  const setNotification = useSetNotification(); // 6.23 - set notification
  const clearNotification = useClearNotification(); // 6.23 - clear notification

  // state to store the order of anecdotes
  const [anecdoteOrder, setAnecdoteOrder] = useState([]);

  // 6.20 - fetch data with react query
  const result = useQuery({
    queryKey: ['anecdotes'], // query key for caching
    queryFn: anecdoteService.getAnecdotes, // function to fetch anecdotes
    retry: 1, // retry fetching only once on failure
  });

  // 6.22 - mutation for voting
  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.updateAnecdote, // function to update an anecdote
    onError: (error, updatedAnecdote, context) => {
      setNotification('Failed to vote anecdote', 'error'); // 6.23 - set notification
      setTimeout(() => {
        clearNotification(); // 6.23 - clear notification after 5 seconds
      }, 5000);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['anecdotes']); // refetch anecdotes to get updated votes
    },
    onSuccess: (updatedAnecdote) => {
      setNotification(`You voted '${updatedAnecdote.content}'`); // 6.23 - set notification
      setTimeout(() => {
        clearNotification(); // 6.23 - clear notification after 5 seconds
      }, 5000);
    },
  });

  // useEffect to set the initial order and handle new anecdotes
  useEffect(() => {
    if (result.isSuccess && result.data) {
      // get the IDs of the fetched anecdotes
      const fetchedAnecdoteIds = result.data.map((anecdote) => anecdote.id);

      // identify new anecdotes not already in the order
      const newAnecdoteIds = fetchedAnecdoteIds.filter(
        (id) => !anecdoteOrder.includes(id)
      );

      if (newAnecdoteIds.length > 0) {
        // append new anecdotes to the end of the order
        setAnecdoteOrder((prevOrder) => [...prevOrder, ...newAnecdoteIds]);
      }

      // set the initial order if it's empty (first load), list is updated when site is refreshed to prevent wrong votes when anecdotes change order (order change too fast)
      if (anecdoteOrder.length === 0) {
        // sort anecdotes by votes in descending order
        const sortedAnecdotes = [...result.data].sort(
          (a, b) => b.votes - a.votes
        );
        // store the order of anecdote IDs
        setAnecdoteOrder(sortedAnecdotes.map((anecdote) => anecdote.id));
      }
    }
  }, [result.isSuccess, result.data]);

  // function to handle voting
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }); // increment votes and mutate
  };

  if (result.isLoading) {
    return <div>Loading data...</div>; // show loading message
  }

  if (result.isError) {
    return (
      <div>
        <h3>Error</h3>
        {/* show error message */}
        <p>Could not fetch anecdotes. Please try again later.</p>{' '}
      </div>
    );
  }

  // create a map for quick anecdote lookup by ID
  const anecdoteMap = result.data.reduce((acc, anecdote) => {
    acc[anecdote.id] = anecdote;
    return acc;
  }, {});

  return (
    <>
      {anecdoteOrder.map((id) => {
        const anecdote = anecdoteMap[id]; // get the anecdote by ID
        if (!anecdote) return null; // anecdote might have been deleted
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShowAnecdotes;
