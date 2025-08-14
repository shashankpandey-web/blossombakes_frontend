import BasicProvider from "../../../services/basicProvider";
import { API_ENDPOINTS } from "../../../config/endPoints";
import { errorMsg, successMsg } from "../../../actions/customFn";
import { useDispatch } from "react-redux";
import { userSetIslogin } from "../../../redux/slice/authSlice";
import { useContext } from "react";
import { MainContext } from "../../../context";

export const useOtpUtils = () => {
  const dispatch = useDispatch();

  const { setLoginModal } = useContext(MainContext);
  const verifyOtp = async (
    loginData,
    otp,
    navigate,
    setOtpModal,
    setOtp,
    setLoginData
  ) => {
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.login_verify_user_with_otp,
        navigate,
        false,
        false,
        { useMinDelay: true }
      ).postRequest({
        ...loginData,
        otp,
      });

    
      if (response?.status) {
        successMsg(response?.message);
        setLoginModal(false);
        setOtpModal(false);
        setOtp("");
        setLoginData(null);
        localStorage.setItem("__blossombakes_token", response?.access_token);
        dispatch(userSetIslogin());
      } else {
        errorMsg(response?.message || "OTP verification failed");
        setOtp("");
        return { success: false };
      }
    } catch (error) {
      //   errorMsg("An error occurred during verification");
      console.error(error);
      return { success: false };
    }
  };

  const resendOtp = async (loginData, navigate) => {
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.login,
        navigate,
        false
      ).postRequest(loginData);

      if (response?.status) {
        successMsg("New OTP sent successfully");
        return { success: true };
      } else {
        errorMsg(response.message || "Failed to resend OTP");
        return { success: false };
      }
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  };

  return {
    verifyOtp,
    resendOtp,
  };
};
