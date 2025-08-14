import { API_ENDPOINTS } from "../../config/endPoints";
import { errorMsg, successMsg } from "../../actions/customFn";
import BasicProvider from "../../services/basicProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getWishlistList = createAsyncThunk(
  "wishlist/getWishlistList",
  async ({ obj, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await new BasicProvider(
        `${API_ENDPOINTS?.wishlistGet}`,
        navigate,
        true
      ).postRequest();
      const { message, status } = response;
      if (status) {
        return response;
      } else {
        return rejectWithValue(message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleWishlist = async ({
  slug,
  isInWishlist,
  navigate,
  onSuccess,
  onError,
  dispatch,
}) => {
  try {
    const provider = new BasicProvider(
      isInWishlist ? API_ENDPOINTS.wishlistRemove : API_ENDPOINTS.wishlistAdd,
      navigate,
      true,
      false,
      { useMinDelay: true, minDelayMs: 300 }
    );
    await provider.postRequest({ slug });

    if (isInWishlist) {
      successMsg("Removed from wishlist");
    } else {
      successMsg("Added to wishlist");
    }

    if (onSuccess) onSuccess();
    dispatch(getWishlistList({ navigate }));
  } catch (err) {
    console.log("err", err);
    errorMsg("Wishlist action failed");
    if (onError) onError(err);
  }
};

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ slug, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.wishlistRemove,
        navigate,
        true
      ).postRequest({ slug });

      if (response?.status) {
        dispatch(getWishlistList({ navigate }));
        successMsg("Removed from wishlist");
        return response;
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
