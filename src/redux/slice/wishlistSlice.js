import { createSlice } from "@reduxjs/toolkit";
import { getWishlistList } from "../action/wishlistAction";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: false,
    wishlist_list: [],
    wishlist_count: 0,
    error: null,
    success: false,
  },
  reducers: {
    clearCart: (state) => {
      state.cart_list = [];
      state.cart_total = [];
      state.promocode_details = {};
      state.cart_count = 0;
      state.success = false;
      state.error = null;
    },

    incrementWishlist: (state) => {
      state.count += 1;
    },
    decrementWishlist: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
    setWishlistCount: (state, action) => {
      state.count = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getWishlistList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistList.fulfilled, (state, { payload }) => {
        console.log("payload", payload);
        state.loading = false;
        state.success = true;
        state.wishlist_list = payload?.data ?? [];
        state.wishlist_count = payload?.wishlist_count ?? 0;
      })
      .addCase(getWishlistList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.wishlist_list = [];
        state.wishlist_count = 0;
      });
  },
});

export const { incrementWishlist, decrementWishlist, setWishlistCount } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
