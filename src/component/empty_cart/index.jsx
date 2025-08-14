import React from "react";
import image from "../../utils/helpers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./empty_cart.scss";

import { useNavigate } from "react-router-dom";

const EmptyCart = ({ type = "cart" }) => {
  const navigate = useNavigate();
  

  const emptyStates = {
    cart: {
      heading: "No item in Card",
      image: image["empty-cart.png"],
      headerText: "Shopping Cart",
    },
    wishlist: {
      heading: "No item in Wishlist",
      image: image["empty-wishlist.png"],
    },
    order: {
      heading: "No Orders Yet",
      image: image["empty-cart.png"],
    },
     product: {
      heading: "No Product Found",
      image: image["not_found.png"],
    },

     blog: {
      heading: "No blogs found",
      image: image["not_found.png"],
    },
  };


  const { 
    heading, 
    image:imageSrc, 
  } = emptyStates[type] || emptyStates.cart;

  return (
    <div className="empty-card">
      <div className="container">

        {/* Main Content */}
        <div className="center-img">
          <LazyLoadImage
            alt="empty-state"
            src={imageSrc}
            effect="opacity"
            wrapperProps={{ style: { transitionDelay: ".1s" } }}
          />
          <h2>{heading}</h2>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmptyCart);