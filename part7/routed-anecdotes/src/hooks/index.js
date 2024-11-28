import { useState } from 'react';

export const useField = (type) => {  // 7.4 - custom hook
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => { // 7.5 - reset function, sets value to empty string
    setValue('');
  }

  return {
    inputProps: { // 7.6 - fix error by preventing reset function from being passed to input
      type,
      value,
      onChange,
    },
    reset,
  };
};
