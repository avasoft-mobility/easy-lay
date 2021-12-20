import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = '';
    },
  },
});

export default tokenSlice.reducer;
export const { setToken, removeToken } = tokenSlice.actions;
