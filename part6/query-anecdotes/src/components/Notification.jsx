import { useNotificationMessage } from '../contexts/NotificationContext';

// 6.23 - Notification component
const Notification = () => {
  const { message, status } = useNotificationMessage(); // get notification message and status from context

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid',
    padding: 5,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    visibility: message ? 'visible' : 'hidden',
    height: '20px',
    textAlign: 'center',
  };

  const successStyle = {
    borderColor: 'green',
    color: 'green',
  };

  const errorStyle = {
    borderColor: 'red',
    color: 'red',
  };

  // set the style based on the status
  const notificationStyle =
    status === 'success'
      ? { ...baseStyle, ...successStyle }
      : { ...baseStyle, ...errorStyle };

  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
