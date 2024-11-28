import React, { useState } from 'react';
import useCountry from './hooks'; // 7.7 - import custom hook

// I made separate component for clarity
import Country from './components/Country';

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
  const nameInput = useField('text'); // for hooking input field
  const [name, setName] = useState(''); // for storing the input name of the country
  const country = useCountry(name); // 7.7 - custom hook for fetching country data

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value); // store the input name of the country to name
  };

  return (
    <>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </>
  );
};

export default App;