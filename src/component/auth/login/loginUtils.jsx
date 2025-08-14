import { Form } from "antd";
import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../config/endPoints";
import { errorMsg, successMsg } from "../../../actions/customFn";
import BasicProvider from "../../../services/basicProvider";
import { MainContext } from "../../../context";
import { jwtDecode } from "jwt-decode";
import { userSetIslogin } from "../../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
export const LoginUtils = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loginModal, setLoginModal } = useContext(MainContext);
  const [otpModal, setOtpModal] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const type = values.username.includes("@") ? "email" : "mobile";
      const response = await new BasicProvider(
        API_ENDPOINTS.login,
        navigate,
        false,
        false,
        { useMinDelay: true }
      ).postRequest({
        type,
        [type]: values.username,
      });

      console.log("response", response);
      if (response?.status) {
        successMsg("OTP sent successfully");
        setLoginData({
          type,
          [type]: values?.username,
        });
        setLoginModal(false);
        setOtpModal(true);
      } else {
        errorMsg(response.message || "Login failed");
      }
    } catch (error) {
      errorMsg("An error occurred during login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const validateUsername = (_, value) => {
    if (!value) {
      return Promise.reject("Please enter your email or mobile number");
    }
    // Basic validation for email or mobile
    if (value.includes("@")) {
      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return Promise.reject("Please enter a valid email address");
      }
    } else {
      // Mobile validation (assuming 10 digits for Indian numbers)
      if (!/^[0-9]{10}$/.test(value)) {
        return Promise.reject("Please enter a valid 10-digit mobile number");
      }
    }
    return Promise.resolve();
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        throw new Error("No credential received from Google");
      }

      // Decode the JWT to get user info
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user data:", decoded);

      // Prepare the request data
      const requestData = {
        token: credentialResponse.credential,
        full_name: decoded.name || "",
        email: decoded.email || "",
      };

      // Send to Laravel backend
      const response = await new BasicProvider(
        API_ENDPOINTS.login_google,
        null,
        false
      ).postRequest(requestData);

      if (response?.status) {
        localStorage.setItem("__blossombakes_token", response?.access_token);
        successMsg("Login successful");
        setLoginModal(false);
        dispatch(userSetIslogin());
      } else {
        errorMsg(response?.message || "Google login failed");
      }
    } catch (error) {
      errorMsg(error.message || "Google login error");
      console.error("Google login error:", error);
    }
  };

  const handleGoogleError = () => {
    errorMsg("Google login failed");
  };

  // --- START: NEW FACEBOOK LOGIN LOGIC ---
  const handleFacebookSuccess = async (response) => {
    setLoading(true);
    try {
      if (!response?.accessToken) {
        throw new Error("No access token received from Facebook");
      }

      console.log("Facebook accessToken:", response.accessToken);

      // Prepare the request data for your backend.
      // Your backend will use this token to securely fetch user details from Facebook's Graph API.
      const requestData = {
        token: response.accessToken,
      };

      // Send to your backend for verification and login/registration
      const backendResponse = await new BasicProvider(
        API_ENDPOINTS.login_facebook, // IMPORTANT: Ensure this endpoint exists in your config
        null,
        false
      ).postRequest(requestData);

      if (backendResponse?.status) {
        // This is your app's token from your server, not Facebook's
        localStorage.setItem(
          "__blossombakes_token",
          backendResponse?.access_token
        );
        successMsg("Login successful");
        setLoginModal(false);
        dispatch(userSetIslogin());
      } else {
        errorMsg(
          backendResponse?.message || "Facebook login failed on our server."
        );
      }
    } catch (error) {
      errorMsg(
        error.message || "An unexpected error occurred during Facebook login."
      );
      console.error("Facebook login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookError = (error) => {
    console.error("Facebook login failed:", error);
    errorMsg("Facebook login was cancelled or failed.");
  };
  // --- END: NEW FACEBOOK LOGIN LOGIC ---

  return {
    handleLogin,
    loading,
    loginData,
    otpModal,
    validateUsername,
    form,
    setOtpModal,
    loginData,
    setLoginData,
    handleGoogleSuccess,
    handleGoogleError,
    handleFacebookSuccess, // Export the new function
    handleFacebookError, // Export the new function
  };
};
