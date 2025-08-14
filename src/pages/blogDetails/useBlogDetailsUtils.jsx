import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/endPoints";
import BasicProvider from "../../services/basicProvider";

export const useBlogDetailsUtils = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await new BasicProvider(
        `${API_ENDPOINTS.blogDetail}`,
        navigate,
        true
      ).postRequest({
        slug,
      });

      if (response?.status) {
        setBlog(response.data);
      }
    } catch (err) {
      console.error("Error fetching blog details:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
        fetchBlogDetails()
  },[slug])
  return {
    blog,
    loading,
  };
};
