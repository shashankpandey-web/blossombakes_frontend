import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { API_ENDPOINTS } from "../../config/endPoints";
import BasicProvider from "../../services/basicProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../context";

export const ProductUtils = () => {
  const debounceTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCity } = useContext(MainContext);

  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [categoryBanner, setCategoryBanner] = useState("");
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 16,
    total: 0,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    weights: [],
    shapes: [],
    pricerange: [],
    search: "",
  });

  useEffect(() => {
    if (slug) {
      setSelectedFilters((prev) => ({
        ...prev,
        category: [slug],
      }));

      setPagination((prev) => ({ ...prev, current: 1 }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        category: [],
      }));
    }
  }, [slug]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search") || "";

    setSearchText(searchQuery);
    setSelectedFilters((prev) => ({
      ...prev,
      search: searchQuery,
    }));
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, [location.search]);

  const [sortOption, setSortOption] = useState("latest");

  const fetchFilters = useCallback(async () => {
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.filters,
        navigate,
        true
      ).postRequest({ category_slug: slug });

      if (response?.status) {
        setFilters(response?.data);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }, [slug]);

  // useEffect(() => {
  //   fetchFilters();
  // }, [fetchFilters]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const startTime = Date.now();
    try {
      const params = {
        ...selectedFilters,
        offset: Number(pagination.current) - 1,
        limit: pagination.pageSize,
        sort_by: sortOption,
      };

      const response = await new BasicProvider(
        API_ENDPOINTS.products,
        navigate,
        true
      ).postRequest(params);

      console.log("API Response:", response); // Debug log

      if (response?.status) {
        setProducts(response.data?.products || response.data || []);
        setPagination((prev) => ({
          ...prev,
          total: response.count || 0,
        }));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 500 - elapsedTime);
      setTimeout(() => setLoading(false), remainingTime);
    }
  }, [
    selectedFilters,
    pagination.current,
    pagination.pageSize,
    sortOption,
    navigate,
  ]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 100);

    return () => clearTimeout(debounceTimer);
  }, [fetchProducts, selectedCity]);

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[type] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return { ...prev, [type]: newValues };
    });
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleSearch = (value) => {
    setSelectedFilters((prev) => ({ ...prev, search: value }));
    setPagination((prev) => ({ ...prev, current: 1 }));

    if (!searchText || !value) {
      const params = new URLSearchParams(location.search);
      params.delete("search");
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handlePaginationChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  const handleSearchChange = (value) => {
    setSearchText(value);
  };

  const fetchProductListBanners = useCallback(async () => {
    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.category_banner,
        navigate,
        true
      ).postRequest({
        slug,
      });

      if (response?.status) {
        setCategoryBanner(response?.data);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    } finally {
      setLoadingBanner(false);
    }
  }, [slug]);


  

  useEffect(() => {
    fetchProductListBanners();
  }, [fetchProductListBanners, slug]);


 

  return {
    products,
    filters,
    loading,
    pagination,
    selectedFilters,
    handleFilterChange,
    handleSearch,
    handleSortChange,
    handlePaginationChange,
    handleSearchChange,
    searchText,
    categoryBanner,
    loadingBanner,
  };
};
