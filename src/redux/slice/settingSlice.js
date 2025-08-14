import { createSlice } from "@reduxjs/toolkit";
import { getSetting } from "../action/settingAction";

const initialState = {
  error: null,
  success: false,
  setting: { wishlist_count: 0 },
  countries: {},
  
};

const settingSlice = createSlice({
  name: "Setting",
  initialState,
  reducers: {
    addWhishlistCount: (state, action) => {
      if (state?.setting?.wishlist_count != undefined) {
        state.setting.wishlist_count = action.payload;
      }
    },
    removeWhishlistCount: (state, action) => {
      if (
        state?.setting?.wishlist_count != undefined &&
        state?.setting?.wishlist_count > 0
      ) {
        state.setting.wishlist_count = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getSetting.pending, (state) => {
        state.error = null;
         state.loading = true;
      })
      .addCase(getSetting.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.setting = payload;
      })
      .addCase(getSetting.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});
export const { addWhishlistCount, removeWhishlistCount } = settingSlice.actions;
export default settingSlice.reducer;
