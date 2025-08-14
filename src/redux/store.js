import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "./slice/settingSlice";
import wishlistSlice from "./slice/wishlistSlice";
import authSlice from "./slice/authSlice";
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    setting: settingSlice,
    wishlist: wishlistSlice,
    cart : cartSlice,
    auth: authSlice,
   

  },
});
