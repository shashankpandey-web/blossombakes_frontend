
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../../config/endPoints";
import { useNavigate } from "react-router-dom";
import BasicProvider from "../../services/basicProvider";

export const usePageSEO = (slug) => {
  const navigate = useNavigate();
  const [seoData, setSeoData] = useState({
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  });

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await new BasicProvider(
          API_ENDPOINTS?.page_details,
          navigate,
          true,
          false
        ).postRequest({ slug: slug });
        const { data, status } = response;
        if (status) {
          setSeoData({
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            meta_keywords: data.meta_keywords,
          });
        }
      } catch (error) {
        console.error(`Failed to fetch SEO data for slug: ${slug}`, error);
        setSeoData({ title: "Page Not Found", description: "", keywords: "" });
      }
    };

    fetchSeoData();
  }, [slug]);

  return { seoData };
};
