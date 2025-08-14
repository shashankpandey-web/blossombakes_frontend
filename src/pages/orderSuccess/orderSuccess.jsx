import React from "react";
import "./orderSuccess.scss";
import image from "./../../utils/helpers";
import { Link, useLocation } from "react-router-dom";
import { usePageSEO } from "../../hooks/usePageSEO/usePageSEO";
import SEO from "../../component/SEO/SEO";
const orderSuccess = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const { seoData } = usePageSEO("ordersuccess");
  return (
    <>
      <SEO
        title={seoData?.meta_title}
        description={seoData?.meta_description}
        keywords={seoData?.meta_keywords}
      />

      <div className="container">
        <div className="order-success-wrapper">
          <img src={image["order-success.png"]} alt="success" />
          <h3>Thankyou for your purchase</h3>
          <p>We have received your order, Your order will be delivered Soon</p>
          <h4>Your Order ID is #{id}</h4>
          <Link to={"/products"} className="continue-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default orderSuccess;
