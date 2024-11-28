// 7.3 - notification
// I wanted to create a notification component that would be used to display messages to the user.
// using context so timeout and status can be controlled from the component that sets the notification
// I followed the example of part6 tasks; Also read the react documentation on context
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotificationState] = useState(null);

  const setNotification = (message, timeout = 5000, status = 'success') => {
    setNotificationState({ message, status });
    setTimeout(() => {
      clearNotification();
    }, timeout);
  };

  const clearNotification = () => {
    setNotificationState(null);
  };

  return (
    <NotificationContext.Provider value={{ setNotification, clearNotification }}>
      <Notification notification={notification} />
      {children}
    </NotificationContext.Provider>
  );
};


// notification component
const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const baseStyle = {
    color: 'black',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  };

  const successStyle = {
    ...baseStyle,
    backgroundColor: 'lightgreen',
    borderColor: 'green',
  };

  const errorStyle = {
    ...baseStyle,
    backgroundColor: 'lightcoral',
    borderColor: 'red',
  };

  const style =
    notification.status === 'success' ? successStyle : errorStyle;

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
