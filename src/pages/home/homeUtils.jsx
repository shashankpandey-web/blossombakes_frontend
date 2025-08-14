import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicProvider from "../../services/basicProvider";
import { API_ENDPOINTS } from "../../config/endPoints";

export const useHomeUtils = () => {
  const navigate = useNavigate();

  const [sectionData, setSectionData] = useState({});
  const [data, setData] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [loading, setLoading] = useState(true);

  const SECTION_CONFIG = [
    { name: "banner", priority: 1 },
    { name: "celebration_categories", priority: 1 },
    { name: "special_occasion_products", priority: 2 },
    { name: "our_featured_products", priority: 2 },
    { name: "latest_products", priority: 2 },
    { name: "popular_products", priority: 3 },
    { name: "combo_gifts_categories", priority: 7 },
    { name: "order_reviews_list", priority: 7 },
    { name: "blogs", priority: 8 },
  ];

  const fetchSectionData = async (sectionName) => {
    setLoadingStates((prev) => ({ ...prev, [sectionName]: true }));

    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.page_details,
        navigate,
        true
      ).postRequest({
        slug: "home",
        section: sectionName,
      });

      if (response?.status && response?.data) {
        setSectionData((prev) => ({
          ...prev,
          [sectionName]: response.data,
        }));
      }
    } catch (error) {
      console.error(`Error loading ${sectionName}:`, error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [sectionName]: false }));
    }
  };

  useEffect(() => {
    const loadSections = async () => {
      // Load critical sections (priority 1)
      await Promise.all([
        fetchSectionData("banner"),
        fetchSectionData("celebration_categories"),
      ]);

      // Update main loading flag after critical sections
      setLoading(false);

      // Load priority 2 sections immediately
      SECTION_CONFIG.filter((s) => s.priority == 2).forEach((s) =>
        fetchSectionData(s.name)
      );

      // Load priority 3+ sections after delay
      setTimeout(() => {
        SECTION_CONFIG.filter((s) => s.priority >= 3).forEach((s) =>
          fetchSectionData(s.name)
        );
      }, 300);
    };

    loadSections();
  }, [navigate]);

  useEffect(() => {
   
    const fetchHomeDetails = async () => {
      try {
        const response = await new BasicProvider(
          API_ENDPOINTS.page_details,
          navigate,
          true
        ).postRequest({ slug: "home" });

        if (response?.status && response?.data) {
          setData(response.data);
        } else {
        }
      } catch (err) {
      } finally {
        setLoading(false);
        console.timeEnd("API call");
      }
    };

    fetchHomeDetails();
  }, [navigate]);

  return {
    loading,
    sectionData,
    loadingStates,
    data
  };
};
