import React from "react";
import "./orderhistory.scss";
import { Link } from "react-router-dom";
import { useOrderHistoryUtils } from "./orderHistoryUtils";
import { Pagination, Spin } from "antd";
import SEO from "../../../component/SEO/SEO";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const { setting } = useSelector((state) => state.setting);
  const { orders, loading, pagination, handlePaginationChange } =
    useOrderHistoryUtils();

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-delivered";
      case "Pending":
        return "status-pending";
      case "Cancelled":
        return "status-cancelled";
      case "On the way":
      case "Shipped":
        return "status-onway";
      default:
        return "status-pending";
    }
  };

  return (
    <>
      <SEO
        title={setting?.meta_title}
        description={setting?.meta_description}
        keywords={setting?.meta_keywords}
      />

      <div className="order-history-wrapper account_order_history_list">
        <div className="top-heading">
          <h3>My Orders</h3>
        </div>
        <div className="content-container">
          <Spin spinning={loading}>
            <div className="table-main">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date and Time</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.oder_id}</td>
                        <td>
                          <strong>{order.created_at}</strong>
                        </td>
                        <td>₹ {order.total}</td>
                        <td>
                          <span className={getStatusClass(order.order_status)}>
                            {order.order_status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/profile/orderdetail/${order.id}`}
                            className="view-detail"
                            state={{ orderData: order.orderData }}
                          >
                            View Detail
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr rowSpan="3">
                      <td colSpan="5" className="no-orders">
                        <div style={{ textAlign: "center", padding: "20px" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            style={{ marginBottom: "10px", color: "#999" }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 7.5L12 12.75l8.25-5.25M12 12.75V21M3.75 7.5v9A2.25 2.25 0 006 18.75h12a2.25 2.25 0 002.25-2.25v-9"
                            />
                          </svg>
                          <div>No orders found</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination-container">
              {pagination.total > 3 && (
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  onChange={handlePaginationChange}
                  showSizeChanger={false}
                />
              )}
            </div>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
