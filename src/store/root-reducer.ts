import { combineReducers } from "@reduxjs/toolkit";
import { UserReducer } from "./user/user-reducer";

export const rootReducer = combineReducers({
  user: UserReducer,
});
