// this file handles the unauthorized requests and redirects the user to the login page if the session has expired, made this for learning purposes
import axios from 'axios';
import { clearUser } from '../reducers/loginReducer';
import { showNotification } from '../reducers/notificationReducer';

const axiosInstance = axios.create();

let axiosService; // redux store

export const setAxiosService = (reduxStore) => {
  axiosService = reduxStore;
};

// add interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (axiosService) {
        axiosService.dispatch(clearUser()); // clear user state
        axiosService.dispatch(showNotification('Session expired, please log in again', 'error'));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
