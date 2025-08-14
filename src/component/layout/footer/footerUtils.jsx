import React, { useState } from "react";
import BasicProvider from "../../../services/basicProvider";
import { API_ENDPOINTS } from "../../../config/endPoints";
import { errorMsg, successMsg } from "../../../actions/customFn";
import { useNavigate } from "react-router-dom";

const footerUtils = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      if (!email) {
        errorMsg("Please enter your email address");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMsg("Please enter a valid email address");
        return;
      }

      setLoading(true);
      const response = await new BasicProvider(
        API_ENDPOINTS.newsletter,
        navigate,
        true
      ).postRequest({
        email: email,
      });


      console.log("responseresponse",response)
      if (response?.status) {
        successMsg("Your message has been sent successfully!");
        setEmail("")
      } else {
        errorMsg(response?.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubscribe();
    }
  };

  return {
    handleSubscribe,
    email,
    setEmail,
    handleKeyPress,
    loading,
  };
};

export default footerUtils;
