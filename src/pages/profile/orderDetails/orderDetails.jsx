import React from "react";
import "./orderDetails.scss";
import { Backarrow, Download } from "../../../icon/icons";
import { Link } from "react-router-dom";
import { Col, Row, Skeleton } from "antd";
import {
  ClockCircleOutlined,
  MessageOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  CalendarFilled,
  MailOutlined,
  GiftOutlined,
} from "@ant-design/icons";

import { useorderDetailsUtils } from "./orderDetailsUtils";

const OrderDetails = () => {
  const { order, loading, handleDownloadInvoice } = useorderDetailsUtils();

  const PriceDisplay = ({ regularPrice, discountPrice, isSubtle = false }) => {
    const hasDiscount =
      discountPrice && parseFloat(discountPrice) < parseFloat(regularPrice);

    return (
      <div className={`price-display ${isSubtle ? "subtle" : ""}`}>
        {hasDiscount ? (
          <>
            <span className="discount-price">₹{regularPrice}</span>
            {/* <span className="regular-price-struck">₹{regularPrice}</span> */}
          </>
        ) : (
          <span className="regular-price">₹{regularPrice}</span>
        )}
      </div>
    );
  };

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
    <div className="order-details-wrapper account_order_details">
      <div className="top-heading">
        {loading ? (
          <>
            <Skeleton
              active
              paragraph={{ rows: 0 }}
              className="account-order-details-skeleton"
            />
          </>
        ) : (
          <>
            <h3>
              <Link to={"/profile/order-history"}>
                <Backarrow />
              </Link>{" "}
              My Orders
            </h3>
            <p>{order?.created_at}</p>
            <p> {(order?.products || []).length} Products</p>
          </>
        )}
      </div>

      <div className="content-container">
        <Row gutter={24}>
          {/* Sender & Receiver Details Section */}
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="details-card">
              <h3>Sender & Receiver Details</h3>
              {loading ? (
                <Skeleton
                  active
                  paragraph={{ rows: 4 }}
                  style={{ marginTop: "10px", padding: "16px" }}
                />
              ) : (
                <>
                  <div className="detail-group">
                    <h4>Sender (Billing)</h4>

                    <ul>
                      <li>{order?.bl_full_name}</li>
                      <li>{order?.bl_email}</li>
                      <li>(+91) {order?.bl_phone_number}</li>
                    </ul>
                  </div>
                  <div className="detail-group">
                    <h4>Receiver (Shipping)</h4>
                    <ul>
                      <li>{order?.full_name}</li>
                      <li>{order?.shipping_address}</li>
                      <li>{order?.email}</li>
                      <li>(+91) {order?.phone_number}</li>
                    </ul>
                  </div>

                  {(order?.occasion_title || order?.message_card) && (
                    <div className="detail-group">
                      <h4>Occasion & Message</h4>
                      <ul>
                        <li></li>

                        <li>
                          {" "}
                          <b>Occasion:</b>
                          {order?.occasion_title || "N/A"}
                        </li>

                        <li className="occasssion_message_data">
                          <b>Message:</b>
                          {order?.message_card || "N/A"}
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="right-summary">
              <div className="payment-type">
                {loading ? (
                  <Skeleton active paragraph={{ rows: 4 }} />
                ) : (
                  <>
                    <div className="common-data">
                      <p>Order ID:</p>
                      <h4>#{order?.order_id}</h4>
                    </div>
                    <span className="line"></span>
                    <div className="common-data">
                      <p>Payment Method:</p>
                      <h4>{order?.payment_method}</h4>
                    </div>
                  </>
                )}
              </div>

              {loading ? (
                <Skeleton active paragraph={{ rows: 1 }} />
              ) : (
                <ul>
                  {(order?.totals || []).map((item, index) => (
                    <li key={index}>
                      <p>{item?.title}:</p>
                      <h3>₹{item?.value}</h3>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>
        </Row>

        {/* Download Invoice Section */}
        <div className="download-invoice-wrapper">
          {loading ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : (
            <>
              <p>
                Order Status :{" "}
                <span className={getStatusClass(order.order_status)}>
                  {order?.order_status}
                </span>
              </p>
              <button
                className="download-btn"
                onClick={() => handleDownloadInvoice(order)}
              >
                Download invoice <Download />
              </button>
            </>
          )}
        </div>

        {/* Products Table Section */}
        <div className="order-product-list">
          {!loading && (
            <div className="list-header">
              <div className="header-item product">Product</div>
              <div className="header-item price">Price</div>
              <div className="header-item quantity">Quantity</div>
              <div className="header-item total">Subtotal</div>
            </div>
          )}

          {loading ? (
            <Skeleton active paragraph={{ rows: 8 }} />
          ) : (
            (order?.products || []).map((item, index) => (
              <div key={index} className="order-product-card">
                {/* --- Main Product Row --- */}
                <div className="main-product-info">
                  <div className="product-cell">
                    <img
                      src={item?.image}
                      alt={item?.title}
                      className="product-image"
                    />
                    <div className="product-details">
                      <p className="product-title">{item?.title}</p>

                      <div className="product-extra-details">
                        {item.flavour && (
                          <div className="detail-tag">
                            <span>
                              <b>Flavour:</b> {item.flavour}
                            </span>
                          </div>
                        )}
                        {item.weight && (
                          <div className="detail-tag">
                            <span>
                              <b>Weight:</b> {item.weight}
                            </span>
                          </div>
                        )}
                        {item.eggless && (
                          <div className="detail-tag eggless">
                            <CheckCircleOutlined /> <b>Eggless:</b>
                            <span>{item.eggless}</span>
                          </div>
                        )}
                        {item.shipping && (
                          <div className="detail-tag shipping">
                            <RocketOutlined />
                            <span>{item.shipping}</span>
                          </div>
                        )}
                        {item.delivery_date && (
                          <div className="detail-tag date">
                            <CalendarFilled />
                            <span>{item.delivery_date}</span>
                          </div>
                        )}
                        {item.shipping_slot && (
                          <div className="detail-tag slot">
                            <ClockCircleOutlined />
                            <span>{item.shipping_slot}</span>
                          </div>
                        )}
                        {item.cake_message && (
                          <div className="detail-tag message">
                            <MessageOutlined />
                            <span>"{item.cake_message}"</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="price-cell">
                    <PriceDisplay
                      regularPrice={item?.regular_price}
                      discountPrice={item?.discount_price}
                    />
                  </div>
                  <div className="quantity-cell">x {item?.quantity}</div>
                  <div className="total-cell">₹{item?.total}</div>
                </div>

                {/* --- Addon Products in Columnar Layout --- */}
                {item.order_addonproducts &&
                  item.order_addonproducts.length > 0 && (
                    <div className="addon-section">
                      {item.order_addonproducts.map((addon) => (
                        <div key={addon.id} className="addon-item-row">
                          <div className="product-cell addon">
                            <img
                              src={addon.image}
                              alt={addon.title}
                              className="addon-image"
                            />
                            <div className="addon-details">
                              <span className="addon-title">{addon.title}</span>
                            </div>
                          </div>
                          <div className="price-cell addon">
                            <PriceDisplay
                              regularPrice={addon.regular_price}
                              discountPrice={addon.discount_price}
                              isSubtle={true}
                            />
                          </div>
                          <div className="quantity-cell addon">
                            x {addon.quantity}
                          </div>
                          <div className="total-cell addon">₹{addon.total}</div>
                        </div>
                      ))}
                    </div>
                  )}

                {item?.is_review && (
                  <div className="review-action-bar">
                    <Link
                      to={`/profile/review/${item?.id}`}
                      state={{ product: item, order_id: order?.id }}
                    >
                      Add Review
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
