import { useState, useEffect } from "react";
import BasicProvider from "../../../services/basicProvider";
import { API_ENDPOINTS } from "../../../config/endPoints";
import { useParams } from "react-router-dom";

import axios from "../../../services/axios";
export const useorderDetailsUtils = (navigate) => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const response = await new BasicProvider(
        API_ENDPOINTS.order_detail,
        navigate,
        true,
        "",
        { useMinDelay: true }
      ).postRequest({ order_id: id });

      if (response?.status) {
        setOrder(response.data);
      } else {
        errorMsg(response.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      errorMsg("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (order) => {
    try {
      const response = await axios({
        url: `/order/invoice`,
        method: "POST",
        responseType: "blob",
        data: {
          order_id: order?.id,
        },
      });

      // Create a link element to download the file
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `order_invoice_${order?.order_id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      let Message = "Failed to download PDF.";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            Message = "Invalid request. Please check the entered data.";
            break;
          case 401:
            Message = "Unauthorized. Please check your credentials.";
            break;
          case 404:
            Message = "Invoice not found.";
            break;
          case 500:
            Message = "Server error. Please try again later.";
            break;
          default:
            Message = "Unexpected error occurred. Please try again.";
        }
      } else if (error.request) {
        Message =
          "No response from server. Please check your internet connection.";
      } else {
        Message = "Request error: " + error.message;
      }

      errorMsg(Message);
    } finally {
      console.log("agfa");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return {
    order,
    loading,
    handleDownloadInvoice,
  };
};
