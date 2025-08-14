import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/endPoints';
import BasicProvider from '../../services/basicProvider';

export const usePrivacyPolicyUtils = () => {
  const navigate = useNavigate();
  const [privacyData, setPrivacyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Privacy Policy page data
  const fetchPrivacyData = async () => {
    setLoading(true);
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.page_details,
        navigate,
        true
      ).postRequest({
        slug: 'privacypolicy'
      });

      if (response?.status) {
        setPrivacyData(response.data);
      } 
    } catch (err) {
      console.error('Error fetching privacy policy page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivacyData();
  }, []);

  return {
    privacyData,
    loading
  };
};