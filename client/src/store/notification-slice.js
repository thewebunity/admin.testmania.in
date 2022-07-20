import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    color: "",
    message: "",
    open: false,
  },
  reducers: {
    showNotification: (state, action) => {
      state.color = action.payload.color;
      state.message = action.payload.message;
      state.open = true;
    },
    closeOpen: (state) => {
      state.open = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
