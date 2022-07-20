import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const pagesSlice = createSlice({
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

export const pagesActions = pagesSlice.actions;




export const getPages = () => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/pages/all`,
      method: `GET`,
      body: {},
      functionName: `pages`,
    });

    if (data) {
      console.log(`Set students :========> ${JSON.stringify(data, null, 4)}`);
      dispatch(pagesActions.setPages(data.pages));
      return data.pages;
    }
  } catch (error) {
    console.log(`Error while getting Pages :======> ${error}`);
  }
};

export const getPage = (id) => async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/pages/page/${id}`,
        method: `GET`,
        functionName: `Page`,
      });
  
      if (data) {
        console.log(
          `Set page :========> ${JSON.stringify(data.page, null, 4)}`
        );
        dispatch(pagesActions.setPage(data.page));
        return data;
      }
    } catch (error) {
      console.log(`Error while getting page :======> ${error}`);
      return false;
    }
  };

  export const editPage =
  ({ id, html , css }) =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/pages/edit`,
        method: `PUT`,
        body: JSON.stringify({
          id,
     html,css
        }),
        functionName: `Page`,
      });

      if (data) {
        console.log(
          `Updated Page :========> ${JSON.stringify(data, null, 4)}`
        );
        return true;
      }
    } catch (error) {
      console.log(`Error while updating Page :======> ${error}`);
      return false;
    }
  };

export default pagesSlice;