import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleCatchErrors } from "../../actions/customFn";
import { API_ENDPOINTS } from "../../config/endPoints";
import axios from "../../services/axios";
import BasicProvider from "../../services/basicProvider";

export const getSetting = createAsyncThunk(
  "Setting/getSetting",
  async ({ navigate }, { rejectWithValue, dispatch }) => {
    try {
      const payload = {
        slug: "setting",
      };
      const url = API_ENDPOINTS?.page_details;
      const { data } = await axios.post(url, payload, {});
      if (data.status) {
        return data.data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getState = (sendData, navigate, callback) => {
  new BasicProvider(`${API_ENDPOINTS?.states}`, navigate, true)
    .postRequest(sendData)
    .then((response) => {
      const { status, message } = response;
      if (status) {
        callback(response?.data);
      } else {
        errorMsg(message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCity = (sendData, navigate, callback) => {
  new BasicProvider(`${API_ENDPOINTS?.cities}`, navigate, true)
    .postRequest(sendData)
    .then((response) => {
      const { status, message } = response;
      if (status) {
        callback(response?.data);
      } else {
        errorMsg(message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
