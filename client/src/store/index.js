import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import notificationSlice from "./notification-slice";
import studentsSlice from "./students-slice";
import subjectsSlice from "./subjects-slice";
import examsSlice from "./exams-slice";
import dashboardSlice from "./dashboard-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    dashboard: dashboardSlice.reducer,
    notification: notificationSlice.reducer,
    students: studentsSlice.reducer,
    subjects: subjectsSlice.reducer,
    exams: examsSlice.reducer,
  },
});

export default store;
