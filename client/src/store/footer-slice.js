import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const footersSlice = createSlice({
    name: "pages",
    initialState: {
      pages: [],
      page: null,
  
    },
    reducers: {
      setPages: (state, action) => {
        state.students = action.payload;
      },
      setPage: (state, action) => {
        state.student = action.payload;
      },
     
      clearPage: (state) => {
        state.student = null;
        console.log(`Clearing student ${state.student}`);
      },
    },
  });

export const footersActions = footersSlice.actions;






export const getFooter = () => async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/footer/get`,
        method: `GET`,
        functionName: `Footer`,
      });
  
      if (data) {
        console.log(
          `Set page :========> ${JSON.stringify(data.footer, null, 4)}`
        );
        dispatch(footersActions.setPages(data.footer));
     
        return data;
      }
    } catch (error) {
      console.log(`Error while getting :======> ${error}`);
      return false;
    }
  };

  export const editFooter =
  ({  address,
    phone,
    email,
    fb,
    inst,
    twiter,
    google,
    linkedin,
    youtube }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/footer/edit`,
        method: `PUT`,
        body: JSON.stringify({
            address,
            phone,
            email,
            fb,
            inst,
            twiter,
            google,
            linkedin,
            youtube
        }),
        functionName: `Footer`,
      });

      if (data) {
        console.log(
          `Updateded :========> ${JSON.stringify(data, null, 4)}`
        );
        return true;
      }
    } catch (error) {
      console.log(`Error while updating  :======> ${error}`);
      return false;
    }
  };

export default footersSlice;