import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/endPoints";
import BasicProvider from "../../services/basicProvider";

export const useTermsOfUseUtils = () => {
  const navigate = useNavigate();
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTermsData = async () => {
    setLoading(true);
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.page_details,
        navigate,
        true
      ).postRequest({
        slug: "termsofuse",
      });

      if (response?.status) {
        setTermsData(response.data);
      }
    } catch (err) {
      console.error("Error fetching terms & conditions page data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTermsData();
  }, []);

  return {
    termsData,
    loading,
    error,
  };
};
