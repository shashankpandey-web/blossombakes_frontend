import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/endPoints';
import BasicProvider from '../../services/basicProvider';

export const useTermConditionUtils = () => {
  const navigate = useNavigate();
  const [termData, setTermData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Terms & Conditions page data
  const fetchTermData = async () => {
    setLoading(true);
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.page_details,
        navigate,
        true
      ).postRequest({
        slug: 'termscondition'
      });

      if (response?.status) {
        setTermData(response.data);
      } 
    } catch (err) {
      console.error('Error fetching terms & conditions page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTermData();
  }, []);

  return {
    termData,
    loading
  };
};