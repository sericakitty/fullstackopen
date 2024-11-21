import { createSlice } from '@reduxjs/toolkit';

// 6.9, 6.10 - create a slice for the filter
const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: { // 6.11 - add a reducer for setting the filter
    setFilter(state, action) {
      return action.payload; // update the state with the new filter
    },
  },
});

export const { setFilter } = filterSlice.actions; // export the action creator
export default filterSlice.reducer; // export the reducer
