import { useState } from 'react';
import useResource from './hooks/index'; // 7.8 - custom hook for fetching data from the server

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};


const App = () => {
  const content = useField('text'); // input field for the content of a note
  const name = useField('text'); // input field for the name of a person
  const number = useField('text'); // input field for the number of a person

  // 7.8 - custom hook for fetching data from the server
  const [notes, noteService] = useResource('http://localhost:3005/notes'); // fetch notes from the server
  const [persons, personService] = useResource('http://localhost:3005/persons'); // fetch persons from the server

  // logic for handling the submission of a new note
  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  // logic for handling the submission of a new person
  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </>
  );
};

export default App;
