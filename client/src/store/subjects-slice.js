import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    subject: null,
    isSubmitting: false,
  },
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    submitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    clearSubject: (state) => {
      state.subject = null;
      console.log(`Clearing subject ${state.subject}`);
    },
  },
});

export const subjectsActions = subjectsSlice.actions;

export const getSubjects = () => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/subjects/`,
      method: `GET`,
      body: {},
      functionName: `subjects`,
    });

    if (data) {
      console.log(`Set subjects :========> ${JSON.stringify(data, null, 4)}`);
      dispatch(subjectsActions.setSubjects(data.subjects));
      return data.subjects;
    }
  } catch (error) {
    console.log(`Error while getting subjects :======> ${error}`);
  }
};

export const getSubject = (id) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/subjects/${id}`,
      method: `GET`,
      functionName: `subject`,
    });

    if (data) {
      console.log(
        `Set subject :========> ${JSON.stringify(data.subject, null, 4)}`
      );
      dispatch(subjectsActions.setSubject(data.subject));
      return data;
    }
  } catch (error) {
    console.log(`Error while getting subject :======> ${error}`);
    return false;
  }
};

export const addSubject =
  ({ name, description }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/subjects/add`,
        method: `POST`,
        body: JSON.stringify({
          name,
          description,
        }),
        functionName: `subject`,
      });

      if (data) {
        console.log(
          `Added subject :========> ${JSON.stringify(data, null, 4)}`
        );
        return true;
      }
    } catch (error) {
      console.log(`Error while adding subject :======> ${error}`);
      return false;
    }
  };

export const editSubject =
  ({ id, name, description }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/subjects/edit`,
        method: `PUT`,
        body: JSON.stringify({
          id,
          name,
          description,
        }),
        functionName: `subject`,
      });

      if (data) {
        console.log(
          `Updated subject :========> ${JSON.stringify(data, null, 4)}`
        );
        return true;
      }
    } catch (error) {
      console.log(`Error while updating subject :======> ${error}`);
      return false;
    }
  };

export const deleteSubject = (id) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/subjects/delete/`,
      method: `DELETE`,
      body: JSON.stringify({
        id,
      }),
      functionName: `subject`,
    });

    if (data) {
      console.log(
        `Deleted subject :========> ${JSON.stringify(data, null, 4)}`
      );
      dispatch(getSubjects());
      return true;
    }
  } catch (error) {
    console.log(`Error while deleting subjects :======> ${error}`);
    return false;
  }
};

export default subjectsSlice;
