import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/endPoints';
import BasicProvider from '../../services/basicProvider';

export const useFaqUtils = () => {
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch FAQ page data
  const fetchFaqData = async () => {
    setLoading(true);
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.page_details,
        navigate,
        true
      ).postRequest({
        slug: 'faq'
      });

      if (response?.status) {
        setFaqData(response.data);
      } 
    } catch (err) {
      console.error('Error fetching FAQ page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  return {
    faqData,
    loading,
  };
};