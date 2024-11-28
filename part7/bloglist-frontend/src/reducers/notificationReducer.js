import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, notificationStatus: null },
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        notificationStatus: action.payload.notificationStatus,
      };
    },
    clearNotification() {
      return { message: null, notificationStatus: null };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let notificationTimeout;

export const showNotification = (
  message,
  notificationStatus = 'success',
  notificationTimeOutInSeconds = 5
) => {
  return async (dispatch) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }
    dispatch(setNotification({ message, notificationStatus }));
    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, notificationTimeOutInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
