import { useState, useEffect } from "react";
import BasicProvider from "../../../services/basicProvider";
import { API_ENDPOINTS } from "../../../config/endPoints";

export const useOrderHistoryUtils = (navigate) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    total: 0,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const requestPayload = {
        offset: pagination.current - 1,
      };

      const response = await new BasicProvider(
        API_ENDPOINTS.order,
        navigate,
        true,
        "",
        { useMinDelay: true }
      ).postRequest(requestPayload);

      if (response?.status) {
        setPagination((prev) => ({
          ...prev,
          total: response.page_count * prev.pageSize,
        }));
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
     
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination.current]);

  const handlePaginationChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  return {
    orders,
    loading,
    pagination,
    handlePaginationChange,
    fetchOrders,
  };
};
