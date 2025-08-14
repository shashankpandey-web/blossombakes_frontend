import { createSlice } from "@reduxjs/toolkit";
import { userDetail } from "../action/authAction";


const isAuthenticate = localStorage.getItem(`${import.meta.env.VITE_APP_STORAGE_NAME}`);

const initialState = {
  loading: false,
  isUserDetail: {},
  isUserLogin: isAuthenticate,
  error: null,
  success: false,
};

const userAuthSlice = createSlice({
  name: "user-auth",
  initialState,
  reducers: {
    userSetIslogin: (state) => {
      if (localStorage.getItem(`${import.meta.env.VITE_APP_STORAGE_NAME}`)) {
        state.loading = false;
        state.isUserLogin = true;
        state.error = null;
      }
    },
    userSetIsLogout: (state) => {

      localStorage.removeItem(`${import.meta.env.VITE_APP_STORAGE_NAME}`);
      localStorage.removeItem(`_blossom_selectedCity`);

      state.loading = false;
      state.isUserLogin = false;
      state.isUserDetail = {};

      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User Detail
      .addCase(userDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUserDetail = {};
      })
      .addCase(userDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.isUserLogin = true;
        state.isUserDetail = payload;
      })
      .addCase(userDetail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isUserDetail = {};
      });
  },
});

export const { userSetIslogin, userSetIsLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
