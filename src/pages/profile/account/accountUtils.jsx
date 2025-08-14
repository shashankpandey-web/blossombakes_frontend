import { Form, message } from "antd";
import { useState } from "react";
import BasicProvider from "../../../services/basicProvider";
import { API_ENDPOINTS } from "../../../config/endPoints";
import { successMsg } from "../../../actions/customFn";
import { userDetail } from "../../../redux/action/authAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useAccountUtils = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {

    console.log("valuesvaluesvaluesvaluesvaluesvaluesvaluesvaluesvalues",values)
    setLoading(true);
    try {
      const formattedValues = {
        full_name: values.full_name,
        email: values.email,
        phone_number: values.phone_number,
        date_of_birth: values.date_of_birth
          ? values.date_of_birth.format("YYYY-MM-DD")
          : "",
        date_of_anniversary: values.date_of_anniversary
          ? values.date_of_anniversary.format("YYYY-MM-DD")
          : "",
      };

      const response = await new BasicProvider(
        API_ENDPOINTS.profileUpdate
      ).postRequest(formattedValues);

      if (response?.status) {
        dispatch(userDetail({ navigate }));
        successMsg("Profile updated successfully");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleSubmit,
  };
};
