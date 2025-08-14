import React, { useState } from "react";
import "./productcard.scss";
import { useNavigate, NavLink } from "react-router-dom";
import { Carousel, Skeleton, Spin } from "antd";
import { CartFill, Star } from "./../../../icon/icons";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import { useDispatch } from "react-redux";

import { toggleWishlist } from "../../../redux/action/wishlistAction";

const ProductCard = ({ product }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(product?.is_wishlist);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEvent = () => {
    navigate(`/productdetail/${product?.slug}`);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    setWishlistLoading(true);

    await toggleWishlist({
      slug: product.slug,
      isInWishlist,
      navigate,
      onSuccess: () => {
        setIsInWishlist(!isInWishlist);
      },
      dispatch,
    });

    setWishlistLoading(false);
  };

  const hasSingleImage = product?.images?.length == 1;
  const hasRating = product && product.rating > 0;

  const hasDiscount =
    product?.discount_price &&
    parseFloat(product?.discount_price) < parseFloat(product?.regular_price);

  const handleNavigate = () => {
    navigate(`/productdetail/${product?.slug}`);
  };

  let isDragging = false;
  return (
    <div className="product-cards">
      {/* {hasDiscount && (
        <div className="discount-wrap" onClick={handleEvent}>
          <p>{product?.discount_percentage}</p>
        </div>
      )} */}
      <div className="wishlist-icon" onClick={handleWishlistToggle}>
        {wishlistLoading ? (
          <Spin size="medium" />
        ) : isInWishlist ? (
          <HeartFilled style={{ color: "red", fontSize: 20 }} />
        ) : (
          <HeartOutlined style={{ color: "red", fontSize: 20 }} />
        )}
      </div>

      {hasSingleImage ? (
        <div className="image-slider">
          <div className="image-wrapper product-image-container">
            {isImageLoading && (
              <Skeleton.Image active={true} className="image-skeleton" />
            )}
            <img
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              // onClick={handleEvent}
              onLoad={handleImageLoad}
              style={{ opacity: isImageLoading ? 0 : 1 }}
            />
          </div>
        </div>
      ) : (
        <Carousel
          className="image-slider"
          arrows={product?.images?.length > 1}
          dots={product?.images?.length > 1}
          draggable
          swipeToSlide
          beforeChange={() => (isDragging = true)}
          afterChange={() => setTimeout(() => (isDragging = false), 0)}
        >
          {product?.images &&
            product?.images.map((img, index) => (
              <div
                key={img.slug}
                className="image-wrapper product-image-container"
              >
                <img
                  src={img.url}
                  alt={img.alt || product.name}
                  // onClick={handleEvent}
                  onClick={() => {
                    if (!isDragging) handleEvent();
                  }}
                  loading="lazy"
                />
              </div>
            ))}
        </Carousel>
      )}
      <div className="product-details" onClick={handleEvent}>
        <h3>{product.name || product?.title}</h3>

        <div className="details-footer">
          <div className="price-wrap">
            <h2>₹{product?.discount_price || product?.regular_price}</h2>
            {hasDiscount && (
              <>
                <span className="original-price">₹{product.regular_price}</span>
                <div className="discount-badge">
                  <p>{product?.discount_percentage}</p>
                </div>
              </>
            )}
          </div>

          {hasRating && (
            <h4 className="rating-info">
              <Star /> {product.rating}
              {/* <span>({product.rating_count})</span> */}
            </h4>
          )}
        </div>
      </div>

      <div className="card-action-wrapper">
        <button className="buy-now-btn" onClick={handleNavigate}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
