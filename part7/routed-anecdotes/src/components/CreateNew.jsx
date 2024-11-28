import { // 7.3
  useNavigate
} from 'react-router-dom'
import { useNotification } from './Notification';

import { useField } from '../hooks'; // 7.4 - custom hook

const CreateNew = ({addNew}) => {
  const content = useField('text'); // 7.4 - custom hook
  const author = useField('text');
  const info = useField('text');

  const { setNotification } = useNotification(); // 7.3 - notification
  const navigate = useNavigate();   // 7.3 - navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    setNotification(`a new anecdote ${content.value} created!`);

    navigate('/anecdotes');
  };

  const handleReset = (e) => { // 7.5 - reset button, custom hook
    e.preventDefault();
    content.reset(); // resets all fields
    author.reset();
    info.reset();
  }

  return (
    <>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} /> {/* 7.4, 7.6 - custom hook */}
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button> {/* 7.5 - reset button */}
      </form>
    </>
  );
};


export default CreateNew;