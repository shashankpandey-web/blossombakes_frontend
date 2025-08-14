import { createAsyncThunk } from "@reduxjs/toolkit";
import BasicProvider from "../../services/basicProvider";
import { API_ENDPOINTS } from "../../config/endPoints";
import { errorMsg, successMsg } from "../../actions/customFn";

export const userDetail = createAsyncThunk(
    "auth/userDetail",
    async ({ navigate }, { rejectWithValue, dispatch }) => {
        try {
            const response = await new BasicProvider(API_ENDPOINTS?.user_profile, navigate, true, dispatch).postRequest();
            const { data, message, status } = response;
            if (status) {
                return data;
            } else {
                return rejectWithValue(message);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
