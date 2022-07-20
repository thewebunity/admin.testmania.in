import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: null,
    exam: null,
    isSubmitting: false,
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    submitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    clearStudent: (state) => {
      state.student = null;
      console.log(`Clearing student ${state.student}`);
    },
  },
});

export const studentsActions = studentsSlice.actions;

export const getStudents = () => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/`,
      method: `GET`,
      body: {},
      functionName: `students`,
    });

    if (data) {
      console.log(`Set students :========> ${JSON.stringify(data, null, 4)}`);
      dispatch(studentsActions.setStudents(data.students));
      return data.students;
    }
  } catch (error) {
    console.log(`Error while getting students :======> ${error}`);
  }
};




export const getStudent = (id) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/${id}`,
      method: `GET`,
      functionName: `Student`,
    });

    if (data) {
      console.log(
        `Set student :========> ${JSON.stringify(data.student, null, 4)}`
      );
      dispatch(studentsActions.setStudent(data.student));
      return data;
    }
  } catch (error) {
    console.log(`Error while getting student :======> ${error}`);
    return false;
  }
};

export const getExam =
  ({ id, examId }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/${id}/current-exam/${examId}`,
        method: `GET`,
        functionName: `Exam`,
      });

      if (data) {
        console.log(
          `Set exam :========> ${JSON.stringify(data.exam, null, 4)}`
        );
        dispatch(studentsActions.setExam(data.exam));
        return data;
      }
    } catch (error) {
      console.log(`Error while getting exam :======> ${error}`);
      return false;
    }
  };

export const addStudent =
  ({ name, password, phone, gender, email, dob , school }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/add`,
        method: `POST`,
        body: JSON.stringify({
          name,
          password,
          phone,
          school,
          gender,
          email,
          dob,
        }),
        functionName: `Student`,
      });

      if (data) {
        console.log(
          `Added student :========> ${JSON.stringify(data, null, 4)}`
        );
        return true;
      }
    } catch (error) {
      console.log(`Error while adding student :======> ${error}`);
      return false;
    }
  };

export const editStudent =
  ({ id, name, password, phone, gender, email, dob , school }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/edit`,
        method: `PUT`,
        body: JSON.stringify({
          id,
          name,
          phone,
          school,
          password,
          gender,
          email,
          dob,
        }),
        functionName: `Student`,
      });

      if (data) {
        console.log(
          `Updated student :========> ${JSON.stringify(data, null, 4)}`
        );
        return true;
      }
    } catch (error) {
      console.log(`Error while updating student :======> ${error}`);
      return false;
    }
  };

export const deleteStudents =
  ({ selected }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/delete/`,
        method: `DELETE`,
        body: JSON.stringify({
          selected,
        }),
        functionName: `student`,
      });

      if (data) {
        console.log(
          `Deleted student :========> ${JSON.stringify(data, null, 4)}`
        );
        dispatch(getStudents());
        return true;
      }
    } catch (error) {
      console.log(`Error while deleting students :======> ${error}`);
      return false;
    }
  };

export default studentsSlice;
