import React, { useEffect } from "react";
import "./review.scss";
import { Link } from "react-router-dom";

import { Backarrow, Camera } from "../../../icon/icons";
import { Input, Rate, message, Image } from "antd";
import image from "../../../utils/helpers";
import { useReviewUtils } from "./reviewUtils";
import Loading from "../../../component/Loader/Loading";
import { useSelector } from "react-redux";
import SEO from "../../../component/SEO/SEO";

const Review = () => {
  const { setting } = useSelector((state) => state.setting);
  const { TextArea } = Input;
  const {
    rating,
    setRating,
    description,
    setDescription,
    imagePreviews,
    handleImageUpload,
    removeImage,
    submitReview,
    isSubmitting,
    product,
    order_id,
    navigate,
  } = useReviewUtils();

  useEffect(() => {
    if (!product) {
      navigate("/profile/order-history");
    }
  }, [product, navigate]);

  return (
    <>
      <SEO
        title={setting?.meta_title}
        description={setting?.meta_description}
        keywords={setting?.meta_keywords}
      />

      <Loading isLoading={isSubmitting}>
        <div className="review-wrapper">
          <div className="top-heading">
            <h3>
              <Link to={`/profile/orderdetail/${order_id}`}>
                <Backarrow />
              </Link>{" "}
              Product Review
            </h3>
          </div>
          <div className="content-container">
            <div className="top-review-container">
              <div className="left-rating">
                <p>Rate This Product</p>
                <Rate
                  value={rating}
                  onChange={setRating}
                  style={{ color: "#FFA41C", fontSize: 24 }}
                />
              </div>
              <div className="product-showcase">
                <img src={product?.image} alt={product?.title} />
                <div className="product-info">
                  <h3>{product?.title}</h3>
                  <p>₹{product?.discount_price}</p>
                </div>
              </div>
            </div>

            <div className="description">
              <h3>Review this Product</h3>
              <TextArea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your experience with this product..."
                maxLength={500}
                showCount
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="image-preview-container">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="image-preview-item">
                    <Image
                      src={preview}
                      alt={`Preview ${index}`}
                      width={80}
                      height={80}
                      style={{ objectFit: "cover", borderRadius: 4 }}
                    />
                    <button
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                    >
                      X{/* <Close /> */}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="upload-container">
              <label className="upload-image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                  multiple
                />
                <div className="icon-box">
                  <Camera />
                </div>
                <span className="label-text">
                  {imagePreviews.length > 0
                    ? "Add more images"
                    : "Add product images (max 5)"}
                </span>
              </label>

              <button
                className="submit-btn"
                onClick={submitReview}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      </Loading>
    </>
  );
};

export default Review;
