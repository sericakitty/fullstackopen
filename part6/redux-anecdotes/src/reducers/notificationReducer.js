import { createSlice } from '@reduxjs/toolkit';

// 6.12 - create a slice for the notification
const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // initial state
  reducers: { // 6.13 - add a reducer for setting the notification
    setNotification(state, action) {
      // return action.payload; // update the state with the new notification // I added notificationStatus to control the color of the notification
      return { message: action.payload.message, notificationStatus: action.payload.notificationStatus };
    },
    clearNotification() {
      return ""; // clear the notification
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let notificationTimeout;

// 6.13, 6.19 - I added notificationStatus to control the color of the notification
export const showNotification = (message, notificationTimeOutInSeconds = 5, notificationStatus = 'success') => {
  return async (dispatch) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }
    dispatch(setNotification({ message, notificationStatus }));
    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, notificationTimeOutInSeconds * 1000);
  };
}

export default notificationSlice.reducer;