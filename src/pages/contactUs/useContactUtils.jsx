import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/endPoints";
import BasicProvider from "../../services/basicProvider";
import { Form } from "antd";
import { errorMsg, successMsg } from "../../actions/customFn";

export const useContactUtils = () => {
  const navigate = useNavigate();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactloading, setContactLoading] = useState(false);
  const [form] = Form.useForm();


  const fetchContactData = async () => {
    setLoading(true);
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.page_details,
        navigate,
        true
      ).postRequest({
        slug: "contactus",
      });

      if (response?.status) {
        setContactData(response.data);
      }
    } catch (err) {
      console.error("Error fetching contact page data:", err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleSubmit = async (values) => {
    try {
        setContactLoading(true)
      const response = await new BasicProvider(
        API_ENDPOINTS.contactus,
        navigate,
        true
      ).postRequest({
        full_name: values.fullName,
        mobile_number: values.mobile,
        email: values.email,
        message: values.description,
      });

      if (response?.status) {
        successMsg("Your message has been sent successfully!");
        form.resetFields();
      } else {
        errorMsg(response?.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      
    } finally {
         setContactLoading(false)
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return {
    contactData,
    loading,
    form,
    handleSubmit,
    contactloading
  };
};
