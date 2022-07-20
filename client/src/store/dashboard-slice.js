import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    students: null,
    exams: null,
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setExams: (state, action) => {
      state.exams = action.payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export const getDashboard = () => async (dispatch, getState) => {
  console.log("get dashboard data");
  try {
    const response = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/dashboard/`,
      method: `GET`,
      body: {},
      functionName: `dashboard`,
    });

    if (response) {
      console.log(
        `Set dashboard :========> ${JSON.stringify(response, null, 4)}`
      );
      dispatch(dashboardActions.setStudents(response.students));
      dispatch(dashboardActions.setExams(response.exams));
      return true;
    }
  } catch (error) {
    console.log(`Error while getting dashboard :======> ${error}`);
  }
};
export default dashboardSlice;
