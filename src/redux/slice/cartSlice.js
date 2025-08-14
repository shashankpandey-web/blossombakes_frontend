import { createSlice } from "@reduxjs/toolkit";
import { getCartList } from "../action/cartAction";

const initialState = {
  loading: false,
  cart_list: [],
  cart_count: 0,
  cart_total: [],
  coupon_list: [],
  applied_coupon_code: "",
  promocode_details: {},
  rozar_pay_data: {},

  error: null,
  success: false,
};

const cartSlice = createSlice({
  name: "cart-detail",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart_list = [];
      state.cart_total = [];
      state.promocode_details = {};
      state.applied_coupon_code = {};
      state.cart_count = 0;
      state.success = false;
      state.rozar_pay_data = {};
      state.error = null;
      state.razorpay = null;
      state.cod = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartList.fulfilled, (state, { payload }) => {
        console.log("payload", payload);
        state.loading = false;
        state.success = true;
        state.cart_list = payload?.data ?? [];
        state.cart_total = payload?.totals ?? [];
        state.coupon_list = payload?.coupon ?? {};
        state.cart_count = payload?.cart_count ?? 0;
        state.applied_coupon_code = payload?.coupon_code ?? "";
        state.rozar_pay_data = {
          RAZORPAY_KEY_ID: payload?.RAZORPAY_KEY_ID,
          RAZORPAY_MODE: payload?.RAZORPAY_MODE,
        };

        state.razorpay = payload.razorpay,
        state.cod = payload.cod
      })
      .addCase(getCartList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.cart_list = [];
        state.cart_total = [];
        state.promocode_details = {};
        state.cart_count = 0;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
