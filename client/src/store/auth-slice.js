import { createSlice } from "@reduxjs/toolkit";
import { notificationActions } from "./notification-slice";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import sendRequest from "./sendRequest";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export const register =
  ({ name, email, password, phone, dob, gender }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/users/add`,
        method: `POST`,
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          dob,
          gender,
        }),
        functionName: `User`,
      });

      if (data) {
        console.log(
          `Creating user :========> ${JSON.stringify(data, null, 4)}`
        );
        return true;
      }
    } catch (error) {
      console.log(`Error while creating user :======> ${error.message}`);
      return false;
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        color: "info",
        message: "Logging You In...",
      })
    );

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setPersistence(auth, browserSessionPersistence);

      console.log(`Firebase login userCredential ${userCredential}`);

      dispatch(
        notificationActions.showNotification({
          color: "success",
          message: "Logged In!",
        })
      );

      return true;
    } catch (err) {
      dispatch(
        notificationActions.showNotification({
          color: "error",
          message: `${err.message}`,
        })
      );
      console.log(`Firebase login error ${err}`);
      return err.message;
    }
  };

export const reset =
  ({ email }) =>
  async (dispatch) => {
    
    dispatch(
      notificationActions.showNotification({
        color: "info",
        message: "Sending Password Reset Email...",
      })
    );

    try {
      const response = await sendPasswordResetEmail(auth, email);

      

      dispatch(
        notificationActions.showNotification({
          color: "success",
          message: `Check your inbox: ${email}!`,
        })
      );

      return true;
    } catch (err) {
      dispatch(
        notificationActions.showNotification({
          color: "error",
          message: `${err.message}`,
        })
      );
    
      return err.message;
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authActions.setCurrentUser(null));
    dispatch(
      notificationActions.showNotification({
        color: "success",
        message: "Logged Out!",
      })
    );
  } catch (err) {
    dispatch(
      notificationActions.showNotification({
        color: "error",
        message: `${err.message}`,
      })
    );
    console.log(`Firebase signup error ${err}`);
  }
};

export default authSlice;
