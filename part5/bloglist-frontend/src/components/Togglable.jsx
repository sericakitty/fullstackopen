import { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types'; // 5.12 - prop types

// 5.5 - togglable component
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button data-testid="new-blog-button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  // 5.12 - prop types, buttonLabel is required
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable'; // component's name is shown in the React DevTools

export default Togglable;
