// 7.14 - userReducer
import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/user';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

// thunk function to fetch users
export const fetchUsersAsync = () => {
  return async (dispatch) => {
    const users = await getAllUsers(); // fetch users from the server with service function
    dispatch(setUsers(users));
  };
};

export default userSlice.reducer;
