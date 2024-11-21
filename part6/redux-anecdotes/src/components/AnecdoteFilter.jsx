import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

// 6.9 - AnecdoteFilter component
const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10
  };

  const filterChange = (event) => {
    const content = event.target.value;
    dispatch(setFilter(content));
  };

  return (
    <div style={style}>
      filter <input onChange={filterChange} />
    </div>
  );
};


export default AnecdoteFilter;