import {
  Link,
} from 'react-router-dom';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    // 7.1 - router links
    <>
      <Link style={padding} to="/anecdotes">
        anecdotes
      </Link>
      <Link style={padding} to="/create-new">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </>
  );
};

export default Menu;