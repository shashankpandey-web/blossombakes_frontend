import React, { useEffect, useState, useRef } from "react";
import image from "../../utils/helpers";
import { Col, Row, Carousel, Rate, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DownArrow, Star } from "../../icon/icons";

const ProductListings = ({ data, loading, sectionData, loadingStates }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(220);
  const [latestStartIndex, setLatestStartIndex] = useState(0);
  const [popularStartIndex, setPopularStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const latestProducts = sectionData["latest_products"] || [];
  const popularProducts = sectionData["popular_products"] || [];

  // Calculate max indexes based on total products and visible cards
  const latestMaxIndex = Math.max(0, latestProducts.length - visibleCards);
  const popularMaxIndex = Math.max(0, popularProducts.length - visibleCards);

  // Handle responsive card count and measure card height
  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else {
        setVisibleCards(3);
      }

      if (cardRef.current) {
        const height = cardRef.current.offsetHeight;
        setCardHeight(height + 36);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [loadingStates]);

  // Handle scrolling down for latest products
  const slideLatestDown = () => {
    if (latestStartIndex < latestMaxIndex) {
      setLatestStartIndex((prev) => prev + 1);
    }
  };

  // Handle scrolling up for latest products
  const slideLatestUp = () => {
    if (latestStartIndex > 0) {
      setLatestStartIndex((prev) => prev - 1);
    }
  };

  // Handle scrolling down for popular products
  const slidePopularDown = () => {
    if (popularStartIndex < popularMaxIndex) {
      setPopularStartIndex((prev) => prev + 1);
    }
  };

  // Handle scrolling up for popular products
  const slidePopularUp = () => {
    if (popularStartIndex > 0) {
      setPopularStartIndex((prev) => prev - 1);
    }
  };

  // Reset indexes when data changes
  useEffect(() => {
    setLatestStartIndex(0);
    setPopularStartIndex(0);
  }, [sectionData]);

  if (
    (!loadingStates["latest_products"] &&
      (!sectionData["latest_products"] ||
        sectionData["latest_products"].length == 0)) ||
    (!loadingStates["popular_products"] &&
      (!sectionData["popular_products"] ||
        sectionData["popular_products"].length == 0))
  ) {
    return null;
  }

  return (
    <section className="products-listing-popular">
      <img
        data-aos="fade-right"
        data-aos-delay="80"
        className="shape-left"
        src={image["shape-4.png"]}
        alt="shape"
      />
      <img
        data-aos="fade-left"
        data-aos-delay="80"
        className="shape-right"
        src={image["shape-5.png"]}
        alt="shape"
      />
      <div className="container">
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="product-container">
              <div className="top-heading">
                {loading ? (
                  <Skeleton.Button
                    active
                    size="large"
                    style={{ width: 200, height: 32 }}
                  />
                ) : (
                  <>
                    {!loadingStates["latest_products"] &&
                    (!sectionData["latest_products"] ||
                      sectionData["latest_products"].length == 0) ? (
                      ""
                    ) : (
                      <>
                        <h3 data-aos="fade-up">
                          <span>{data?.latest_products_text_1}</span>{" "}
                          {data?.latest_products_text_2}
                        </h3>
                      </>
                    )}
                  </>
                )}
              </div>

              {!loadingStates["latest_products"] &&
                latestProducts.length > visibleCards && (
                  <div className="latest_faeture_product_toogle_btn">
                    <div className="arrow-container">
                      <div
                        className={`arrow-btn up ${
                          latestStartIndex === 0 ? "disabled" : ""
                        }`}
                        aria-label="Scroll up"
                        aria-disabled={latestStartIndex === 0}
                        onClick={slideLatestUp}
                      >
                        <DownArrow />
                      </div>

                      <div
                        className={`arrow-btn down ${
                          latestStartIndex >= latestMaxIndex ? "disabled" : ""
                        }`}
                        onClick={slideLatestDown}
                        aria-label="Scroll down"
                        aria-disabled={latestStartIndex >= latestMaxIndex}
                      >
                        <DownArrow />
                      </div>
                    </div>

                    <div className="view_all">
                      <Link to="/products">View All</Link>
                    </div>
                  </div>
                )}

              <div className="card-list-viewport" data-aos="fade-right">
                {loadingStates["latest_products"] ? (
                  Array(visibleCards)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={`latest-skeleton-${index}`}
                        className="product-card latest_product_card_skeleton"
                        ref={index === 0 ? cardRef : null}
                      >
                        <Skeleton.Image
                          active
                          style={{ width: "100%", height: 120 }}
                        />
                        <div className="product-info">
                          <Skeleton active paragraph={{ rows: 2 }} />
                          <Skeleton.Button
                            active
                            size="small"
                            style={{ width: 100 }}
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <>
                    <motion.div
                      className="card-slider-inner"
                      animate={{ y: -latestStartIndex * cardHeight }}
                      transition={{ type: "tween", duration: 0.5 }}
                    >
                      {latestProducts.map((product, index) => (
                        <div
                          key={product?.id}
                          className="product-card"
                          ref={index === 0 ? cardRef : null}
                        >
                          <img
                            className="product-img"
                            src={product?.image}
                            alt={product?.title}
                          />
                          <div className="product-info">
                            <div className="main-title">
                              <h3>
                                {product?.title.length > 50
                                  ? `${product?.title.slice(0, 50)}...`
                                  : product?.title}{" "}
                              </h3>
                              <span className="rating">
                                {product?.rating > 0 && (
                                  <>
                                    <Star />
                                    <p>({product?.rating || "0"})</p>
                                  </>
                                )}
                              </span>
                            </div>

                            <p>
                              {product?.short_decripation?.length > 128
                                ? `${product?.short_decripation.slice(
                                    0,
                                    128
                                  )}...`
                                : product?.short_decripation}{" "}
                            </p>
                            <div className="price-rating">
                              <span className="price">
                                ₹{product?.discount_price}
                              </span>
                              <button
                                className="order-btn"
                                onClick={() =>
                                  navigate(`/productdetail/${product?.slug}`)
                                }
                              >
                                Order Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="product-container">
              <div className="top-heading">
                {loading ? (
                  <Skeleton.Button
                    active
                    size="large"
                    style={{ width: 200, height: 32 }}
                  />
                ) : (
                  <>
                    {!loadingStates["popular_products"] &&
                    (!sectionData["popular_products"] ||
                      sectionData["popular_products"].length == 0) ? (
                      ""
                    ) : (
                      <>
                        <h3 data-aos="fade-up">
                          <span>{data?.popular_products_text_1}</span>{" "}
                          {data?.popular_products_text_2}
                        </h3>
                        <Link to="/products">View All</Link>
                      </>
                    )}
                  </>
                )}
              </div>
              {!loadingStates["popular_products"] &&
                popularProducts.length > visibleCards && (
                  <div className="latest_faeture_product_toogle_btn">
                    <div className="arrow-container">
                      <div
                        className={`arrow-btn down ${
                          popularStartIndex >= popularMaxIndex ? "disabled" : ""
                        }`}
                        onClick={slidePopularDown}
                        aria-label="Scroll down"
                        aria-disabled={popularStartIndex >= popularMaxIndex}
                      >
                        <DownArrow />
                      </div>
                      <div
                        className={`arrow-btn up ${
                          popularStartIndex === 0 ? "disabled" : ""
                        }`}
                        aria-label="Scroll up"
                        onClick={slidePopularUp}
                        aria-disabled={popularStartIndex === 0}
                      >
                        <DownArrow />
                      </div>
                    </div>
                    <div className="view_all">
                      <Link to="/products">View All</Link>
                    </div>
                  </div>
                )}
              <div className="card-list-viewport" data-aos="fade-left">
                {loadingStates["popular_products"] ? (
                  Array(visibleCards)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={`popular-skeleton-${index}`}
                        className="product-card latest_product_card_skeleton"
                      >
                        <Skeleton.Image
                          active
                          style={{ width: "100%", height: 120 }}
                        />
                        <div className="product-info">
                          <Skeleton active paragraph={{ rows: 2 }} />
                          <Skeleton.Button
                            active
                            size="small"
                            style={{ width: 100 }}
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <motion.div
                    className="card-slider-inner"
                    animate={{ y: -popularStartIndex * cardHeight }}
                    transition={{ type: "tween", duration: 0.5 }}
                  >
                    {popularProducts.map((product, index) => (
                      <div key={product?.id} className="product-card">
                        <img
                          className="product-img"
                          src={product?.image}
                          alt={product?.title}
                        />
                        <div className="product-info">
                          <div className="main-title">
                            <h3>
                              {product?.title.length > 36
                                ? `${product?.title.slice(0, 36)}...`
                                : product?.title}{" "}
                            </h3>
                            <span className="rating">
                              {product?.rating > 0 && (
                                <>
                                  <Star />
                                  <p>({product?.rating || "0"})</p>
                                </>
                              )}
                            </span>
                          </div>
                          <p>
                            {product?.short_decripation?.length > 128
                              ? `${product?.short_decripation.slice(0, 128)}...`
                              : product?.short_decripation}{" "}
                          </p>
                          <div className="price-rating">
                            <span className="price">
                              ₹{product?.discount_price}
                            </span>
                            <button
                              className="order-btn"
                              onClick={() =>
                                navigate(`/productdetail/${product?.slug}`)
                              }
                            >
                              Order Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ProductListings;
