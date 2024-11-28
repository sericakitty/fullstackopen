// 7.13 - loginReducer
import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      window.localStorage.setItem('loggedInUser', JSON.stringify(action.payload));
      return action.payload;
    },
    clearUser() {
      window.localStorage.removeItem('loggedInUser');
      return null;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export const loginAsync = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      return user;
    } catch (error) {
      throw error;
    }
  };
};

export default loginSlice.reducer;

