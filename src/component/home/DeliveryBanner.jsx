import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const DeliveryBanner = ({ data }) => {
  const navigate = useNavigate();
  return (
    <section className="delivery-banner">
      <div className="container">
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="left-banner-details">
              <h3 data-aos="fade-right" data-aos-delay="50">
                {data?.get_same_day_text}{" "}
                <span> {data?.get_same_day_products_text}</span>
              </h3>
              <p data-aos="fade-right" data-aos-delay="80">
                {data?.get_same_day_sub_text}
              </p>
              <button
                data-aos="fade-right"
                data-aos-delay="90"
                className="order-btn"
                onClick={() => navigate("/products")}
              >
                Order Now
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default DeliveryBanner;
