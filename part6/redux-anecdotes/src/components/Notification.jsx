// 6.12 - Notification component
import { useSelector } from 'react-redux';

// I added notificationStatus to control the color of the notification
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { message, notificationStatus } = notification;

  const containerStyle = {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  };

  const baseStyle = {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
  };

  const successStyle = {
    color: 'green',
    backgroundColor: 'lightgrey',
    borderColor: 'green',
  };

  const errorStyle = {
    color: 'red',
    backgroundColor: 'lightgrey',
    borderColor: 'red',
  };

  // this change the color of the notification based on the notificationStatus
  const notificationStyle =
  notificationStatus === 'success'
      ? { ...baseStyle, ...successStyle }
      : { ...baseStyle, ...errorStyle };


  if (!notification) {
    return <div style={containerStyle}></div>; // empty space when no notification
  }

  return (
    <div style={containerStyle}>
      <div style={notificationStyle}>
        {message}
      </div>
    </div>
  );
};

export default Notification;
