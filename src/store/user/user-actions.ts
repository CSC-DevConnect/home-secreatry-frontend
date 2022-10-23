import { Dispatch } from "@reduxjs/toolkit";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer-utils";
import axios from "axios";

export enum USER_ACTIONS {
  SIGN_UP_START = "user/SIGN UP START",
  SIGN_IN_START = "user/SIGN IN START",
  SIGN_OUT_START = "user/SIGN OUT START",
  SIGN_UP_SUCCESS = "user/SIGN UP SUCCESS",
  SIGN_IN_SUCCESS = "user/SIGN IN SUCCESS",
  SIGN_OUT_SUCCESS = "user/SIGN OUT SUCCESS",
  SIGN_UP_FAILED = "user/SIGN UP FAILED",
  SIGN_IN_FAILED = "user/SIGN IN FAILED",
  SIGN_OUT_FAILED = "user/SIGN OUT FAILED",
  FORGOT_PASSWORD_START = "user/FORGOT PASSWORD START",
  FORGOT_PASSWORD_SUCCESS = "user/FORGOT PASSWORD SUCCESS",
  FORGOT_PASSWORD_FAILED = "user/FORGOT PASSWORD FAILED",
  RESET_PASSWORD_START = "user/RESET PASSWORD START",
  RESET_PASSWORD_SUCCESS = "user/RESET PASSWORD SUCCESS",
  RESET_PASSWORD_FAILED = "user/RESET PASSWORD FAILED",
}

export type UserData = {
  success: boolean;
  token: string;
};

export type Message = {
  success: boolean;
  message: string;
};

export type SignUpStart = Action<USER_ACTIONS.SIGN_UP_START>;
export type SignInStart = Action<USER_ACTIONS.SIGN_IN_START>;
export type SignOutStart = Action<USER_ACTIONS.SIGN_OUT_START>;
export type ForgetPassword = Action<USER_ACTIONS.FORGOT_PASSWORD_START>;
export type ResetPassword = Action<USER_ACTIONS.RESET_PASSWORD_START>;

export type SignUpSuccess = ActionWithPayload<
  USER_ACTIONS.SIGN_UP_SUCCESS,
  UserData
>;
export type SignInSuccess = ActionWithPayload<
  USER_ACTIONS.SIGN_IN_SUCCESS,
  UserData
>;
export type SignOutSuccess = ActionWithPayload<
  USER_ACTIONS.SIGN_OUT_SUCCESS,
  null
>;
export type ForgotPasswordSuccess = ActionWithPayload<
  USER_ACTIONS.FORGOT_PASSWORD_SUCCESS,
  Message
>;
export type ResetPasswordSuccess = ActionWithPayload<
  USER_ACTIONS.RESET_PASSWORD_SUCCESS,
  UserData
>;

export type SignUpFailed = ActionWithPayload<
  USER_ACTIONS.SIGN_UP_FAILED,
  Error
>;
export type SignInFailed = ActionWithPayload<
  USER_ACTIONS.SIGN_IN_FAILED,
  Error
>;
export type SignOutFailed = ActionWithPayload<
  USER_ACTIONS.SIGN_OUT_FAILED,
  Error
>;
export type ForgotPasswordFailed = ActionWithPayload<
  USER_ACTIONS.FORGOT_PASSWORD_FAILED,
  Error
>;
export type ResetPasswordFailed = ActionWithPayload<
  USER_ACTIONS.RESET_PASSWORD_FAILED,
  Error
>;

// Sign up actions
export const signUpStart = withMatcher(
  (): SignUpStart => createAction(USER_ACTIONS.SIGN_UP_START)
);
export const signUpSuccess = withMatcher(
  (user: UserData): SignUpSuccess =>
    createAction(USER_ACTIONS.SIGN_UP_SUCCESS, user)
);
export const signUpFailed = withMatcher(
  (error: Error): SignUpFailed =>
    createAction(USER_ACTIONS.SIGN_UP_FAILED, error)
);

// Sign in actions
export const signInStart = withMatcher(
  (): SignInStart => createAction(USER_ACTIONS.SIGN_IN_START)
);
export const signInSuccess = withMatcher(
  (user: UserData): SignInSuccess =>
    createAction(USER_ACTIONS.SIGN_IN_SUCCESS, user)
);
export const signInFailed = withMatcher(
  (error: Error): SignInFailed =>
    createAction(USER_ACTIONS.SIGN_IN_FAILED, error)
);

// Sign out actions
export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTIONS.SIGN_OUT_START)
);
export const signOutSuccess = withMatcher(
  (user: null): SignOutSuccess =>
    createAction(USER_ACTIONS.SIGN_OUT_SUCCESS, user)
);
export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(USER_ACTIONS.SIGN_OUT_FAILED, error)
);

// Forgot Password actions
export const forgotPasswordStart = withMatcher(
  (): ForgetPassword => createAction(USER_ACTIONS.FORGOT_PASSWORD_START)
);
export const forgotPasswordSuccess = withMatcher(
  (message: Message): ForgotPasswordSuccess =>
    createAction(USER_ACTIONS.FORGOT_PASSWORD_SUCCESS, message)
);
export const forgotPasswordFailed = withMatcher(
  (error: Error): ForgotPasswordFailed =>
    createAction(USER_ACTIONS.FORGOT_PASSWORD_FAILED, error)
);

// Reset Password
export const resetPasswordStart = withMatcher(
  (): ResetPassword => createAction(USER_ACTIONS.RESET_PASSWORD_START)
);
export const resetPasswordSuccess = withMatcher(
  (user: UserData): ResetPasswordSuccess =>
    createAction(USER_ACTIONS.RESET_PASSWORD_SUCCESS, user)
);
export const resetPasswordFailed = withMatcher(
  (error: Error): ResetPasswordFailed =>
    createAction(USER_ACTIONS.RESET_PASSWORD_FAILED, error)
);

// SignUp Asychronous actions
export const signUpAsync = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): any => {
  return async (dispatch: Dispatch) => {
    dispatch(signUpStart());
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      dispatch(signUpSuccess(response.data));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(signUpFailed(err));
      }
    }
  };
};

// SignIn Asychronous actions
export const signInAsync = (email: string, password: string): any => {
  return async (dispatch: Dispatch) => {
    dispatch(signInStart());
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      dispatch(signInSuccess(response.data));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(signInFailed(err));
      }
    }
  };
};

// SignOut Asychronous action
export const signOutAsync = (): any => {
  return async (dispatch: Dispatch) => {
    dispatch(signOutStart());
    try {
      await axios.get("http://localhost:5000/api/auth/logout");
      dispatch(signOutSuccess(null));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(signOutFailed(err));
      }
    }
  };
};

// Forgot Password Asychronous action
export const forgotPasswordAsync = (email: string): any => {
  return async (dispatch: Dispatch) => {
    dispatch(forgotPasswordStart());
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgotPassword",
        {
          email,
        }
      );
      console.log(response);
      dispatch(forgotPasswordSuccess(response.data.message));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(forgotPasswordFailed(err));
      }
    }
  };
};

// Reset Password Asychronous action
export const resetPasswordAsync = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(resetPasswordStart());
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/auth/resetPassword/${token}`,
        {
          password,
        }
      );
      dispatch(resetPasswordSuccess(response.data.data));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(resetPasswordFailed(err));
      }
    }
  };
};
