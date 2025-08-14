import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/endPoints';
import BasicProvider from '../../services/basicProvider';

export const useAboutUtils = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch about page data
  const fetchAboutData = async () => {
    setLoading(true);
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.page_details,
        navigate,
        true
      ).postRequest({
        slug: 'aboutus'
      });

      if (response?.status) {
        setAboutData(response.data);
      } 
    } catch (err) {
      console.error('Error fetching about page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return {
    aboutData,
    loading,
  };
};