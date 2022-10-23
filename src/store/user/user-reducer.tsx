import { AnyAction } from "@reduxjs/toolkit";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
  UserData,
} from "./user-actions";

export type UserState = {
  readonly isLoading: boolean;
  readonly currentUser: UserData | null;
  readonly error: Error | null;
};

const INITIAL_STATES: UserState = {
  isLoading: false,
  currentUser: null,
  error: null,
};

export const UserReducer = (
  state = INITIAL_STATES,
  action = {} as AnyAction
) => {
  if (signInSuccess.match(action) || signUpSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
      isLoading: false,
    };
  }

  if (
    signUpFailed.match(action) ||
    signInFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return {
      ...state,
      error: action.payload,
    };
  }
  return state;
};
