// 6.23 - Notification context
import { createContext, useReducer, useContext } from 'react';

// create a reducer function
const notificationReducer = (state, action) => {
  // 6.23 - notification reducer
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, status: action.payload.status };
    case 'CLEAR_NOTIFICATION':
      return { message: null, status: null };
    default:
      return state;
  }
};

// create a context
const NotificationContext = createContext();

// create a provider component
export const NotificationProvider = ({ children }) => {
  // 6.23 - Notification provider
  const [state, dispatch] = useReducer(notificationReducer, {
    message: null,
    status: null,
  });

  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  // 6.23 - custom hook to get notification context
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider'
    );
  }
  return context;
};

// 6.23 - custom hook to get notification message and status
export const useNotificationMessage = () => {
  const { message, status } = useNotificationContext();
  return { message, status };
};

// 6.23 - custom hook to get notification dispatch
export const useNotificationDispatch = () => {
  const { dispatch } = useNotificationContext();
  return dispatch;
};

// 6.23 - function to set notification, type success or error
export const useSetNotification = () => {
  const dispatch = useNotificationDispatch();
  return (message, status = 'success') => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, status } });
  };
};

// 6.23 - function to clear notification
export const useClearNotification = () => {
  const dispatch = useNotificationDispatch();
  return () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  };
};

export default NotificationContext;
