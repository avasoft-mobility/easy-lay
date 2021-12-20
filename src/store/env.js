import { createSlice } from "@reduxjs/toolkit";
import ENV from "../models/env";

const envSlice = createSlice({
  name : 'env',
  initialState: {
    currentEnv: ENV.dev
  },
  reducers: {
    setEnv: (state, action) => {
      state.currentEnv = action.payload
    },
    removeEnv: (state) => {
      state.currentEnv = ENV.dev
    }
  }
});


export default envSlice.reducer;
export const { setEnv, removeEnv } = envSlice.actions;

