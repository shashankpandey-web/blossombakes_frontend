import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/endPoints';
import BasicProvider from '../../services/basicProvider';

export const useCancellationReturnRefundPolicyUtils = () => {
  const navigate = useNavigate();
  const [disclaimerData, setDisclaimerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Disclaimer page data
  const fetchDisclaimerData = async () => {
    setLoading(true);
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.page_details,
        navigate,
        true
      ).postRequest({
        slug: 'cancellation_return_refund_policy'
      });

      if (response?.status) {
        setDisclaimerData(response.data);
      } 
    } catch (err) {
      console.error('Error fetching disclaimer page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisclaimerData();
  }, []);

  return {
    disclaimerData,
    loading
  };
};