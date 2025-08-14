import { createAsyncThunk } from "@reduxjs/toolkit";
import BasicProvider from "../../services/basicProvider";
import { API_ENDPOINTS } from "../../config/endPoints";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const getCartList = createAsyncThunk(
  "auth/getCartList",
  async ({ obj, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const apiRequest = await new BasicProvider(
        `${API_ENDPOINTS?.cart_list}`,
        navigate,
        true
      ).postRequest();
      const minDelay = delay(500);
      const [response] = await Promise.all([apiRequest, minDelay]);

      if (response?.status) {
        return response;
      } else {
        return rejectWithValue(response.message || "Failed to fetch cart list");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
