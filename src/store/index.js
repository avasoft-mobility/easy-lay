import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import token from "./token";
import env from "./env";

const reducer = combineReducers({
  token,
  env
});

const store = configureStore({
  reducer
});

export default store;

