import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/endPoints";
import BasicProvider from "../../services/basicProvider";

export const useBlogsUtils = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 9,
    total: 0,
  });

  // Get query parameters from URL
  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      offset: parseInt(searchParams.get("page")) || 1,
      sort: searchParams.get("sort") || "latest",
    };
  };

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
       const startTime = Date.now();
    try {
      const params = {
        offset: (Number(pagination.current) || 1) - 1,

        sort_by: sortBy,
      };

      const response = await new BasicProvider(
        API_ENDPOINTS.blogs,
        navigate,
        true
      ).postRequest(params);

      if (response?.status) {
        setBlogs(response.data || []);
        setPagination((prev) => ({
          ...prev,
          total: response.count || 0,
        }));
      }
    } catch (err) {
      setError(err.message || "Failed to fetch blogs");
      console.error("Error fetching blogs:", err);
    } finally {

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 500 - elapsedTime);
      setTimeout(() => setLoading(false), remainingTime);
     
    }
  };


  const handleSortChange = (value) => {
    setSortBy(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
    // Update URL
    navigate({
      search: `?sort=${value}&page=1`,
    });
  };


  const handlePaginationChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
    // Update URL
    navigate({
      search: `?sort=${sortBy}&page=${page}`,
    });
  };


  useEffect(() => {
    const { page, sort } = getQueryParams();
    setPagination((prev) => ({ ...prev, current: page }));
    setSortBy(sort);
  }, []);

  
  useEffect(() => {
    fetchBlogs();
  }, [sortBy, pagination.current]);

  return {
    blogs,
    loading,
    error,
    sortBy,
    pagination,
    handleSortChange,
    handlePaginationChange,
  };
};
