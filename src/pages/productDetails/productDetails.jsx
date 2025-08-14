import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./productDetails.scss";
import { Breadcrumbs, Productcard, AddonModal } from "../../component";
import {
  Row,
  Col,
  Rate,
  Button,
  Radio,
  Input,
  DatePicker,
  Tabs,
  Skeleton,
  Modal,
  Select,
  Spin,
  Calendar,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  CalendarOutlined,
  ArrowLeftOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  RightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import image from "../../utils/helpers";
import { Link, useParams } from "react-router-dom";
import { Cakes, Location, Withegg, Withoutegg } from "../../icon/icons";
import { useProductDetailsUtils } from "./productDetailsUtils";
import Notfound from "../../component/NotFound/notfound";
import Loading from "../../component/Loader/Loading";
import moment from "moment";
import { errorMsg } from "../../actions/customFn";
import Empty_cart from "../../component/empty_cart";

const ProductDetails = () => {
  const { Option } = Select;
  const { TabPane } = Tabs;

  const {
    loading,
    product,
    error,
    isInWishlist,
    wishlistLoading,
    handleWishlistToggle,
    weights: apiWeights,
    weight,
    eggType,
    quantity,
    setEggType,
    setFlavor,
    flavor,
    setWeight,
    setCakeMessage,
    cakeMessage,
    setQuantity,
    setDeliveryDate,
    handleAddToCart,
    isAddToCartModalVisible,
    setIsAddToCartModalVisible,
    modalContent,
    cartLoading,
    getCurrentWeightDetails,
    errors,
    deliveryDate,
    setErrors,
    pincode,
    setPincode,
    pincodeValid,
    pincodeError,
    validatePincode,
    handleContinueWithAddons,
    addonModal,
    setAddonModal,
    deliverySlots,
    slotLoading,
    isSlotModalVisible,
    setIsSlotModalVisible,
    selectedShipping,
    setSelectedShipping,
    selectedSlot,
    setSelectedSlot,
    fetchDeliverySlots,
    clearErrors,

    flavorRef,
    pincodeRef,
    deliveryDateRef,
    modalView, // <-- EXPORT
    setModalView,
  } = useProductDetailsUtils();

  const hasCategory = !!product?.category_title;
  const currentWeight = getCurrentWeightDetails();
  
  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    (loading || hasCategory) && {
      label: loading ? (
        <Skeleton.Input active size="small" />
      ) : (
        product.category_title
      ),
      href: hasCategory ? `/category/${product.category_slug}` : undefined,
    },
    {
      label: loading ? (
        <Skeleton.Input active size="small" />
      ) : (
        product?.title || "Product Details"
      ),
      href: "/productdetail",
      active: true,
    },
  ];

  const handleDateChange = (date) => {
    setDeliveryDate(date);
    fetchDeliverySlots(date);
    if (errors.deliveryDate) clearErrors("deliveryDate");
  };

  const handleSlotModalOk = () => {
    if (selectedSlot) {
      setIsSlotModalVisible(false);
    } else {
      errorMsg("Please select a delivery method and time slot.");
    }
  };

  const getSelectedSlotTime = () => {
    if (!selectedShipping || !selectedSlot) return null;
    const shipping = deliverySlots.find(
      (s) => s.shipping_id === selectedShipping
    );
    if (!shipping) return null;
    const slot = shipping.slots.find((s) => s.slot_id === selectedSlot);
    return slot ? `${slot.start_time} - ${slot.end_time}` : null;
  };

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const isOutOfStock = product?.outofstock;

  if (!loading && !product) {
    return <Empty_cart type="product" />;
  }

  const shareProduct = (platform) => {
    const productUrl = window.location.href;
    const productTitle = encodeURIComponent(
      product?.title || "Check out this product"
    );
    const productDescription = encodeURIComponent(
      product?.short_decripation?.replace(/<[^>]*>/g, "") ||
        "Amazing product available"
    );
    const productImage = product?.images?.[0]?.url || "";

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${productTitle}&url=${productUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${productTitle} - ${productUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${productUrl}&title=${productTitle}&summary=${productDescription}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <>
      <Helmet>
        <title>{product?.title || "Product Details"}</title>

        <meta
          name="description"
          content={product?.short_decripation?.replace(/<[^>]*>/g, "") || ""}
        />

        {/* Open   Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:title"
          content={product?.title || "Product Details"}
        />
        <meta
          property="og:description"
          content={product?.short_decripation?.replace(/<[^>]*>/g, "") || ""}
        />
        <meta property="og:image" content={product?.images?.[0]?.url || ""} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta
          property="twitter:title"
          content={product?.title || "Product Details"}
        />
        <meta
          property="twitter:description"
          content={product?.short_decripation?.replace(/<[^>]*>/g, "") || ""}
        />
        <meta
          property="twitter:image"
          content={product?.images?.[0]?.url || ""}
        />
      </Helmet>

      <div className="product-details-wrapper">
        <Loading isLoading={cartLoading}>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="container">
            <Row gutter={24}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="product-display">
                  {loading ? (
                    <>
                      <Skeleton.Image active className="main-image-shimmer" />
                      <div className="thumbnail-shimmer-container d-flex">
                        <Row gutter={[8, 8]} justify="space-between">
                          {[...Array(4)].map((_, i) => (
                            <Col span={6} key={i}>
                              <Skeleton.Image
                                active
                                className="thumbnail-shimmer"
                              />
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </>
                  ) : (
                    <>
                      <Swiper
                        style={{
                          "--swiper-navigation-color": "#fff",
                          "--swiper-pagination-color": "#fff",
                        }}
                        spaceBetween={15}
                        navigation={true}
                        // thumbs={{ swiper: thumbsSwiper }}
                        thumbs={{
                          swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                              ? thumbsSwiper
                              : null,
                        }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                      >
                        {product?.images?.map((img, index) => (
                          <SwiperSlide key={index}>
                            <img src={img.url} alt={img.alt || product.title} />
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={11}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                      >
                        {product?.images?.map((img, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={img?.url}
                              alt={img.alt || product?.title}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </>
                  )}
                </div>

                {!loading && (
                  <img
                    className="banner-img services_banner___image"
                    src={image["feature-tag.png"]}
                    alt="banner"
                  />
                )}
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="product-breif">
                  {loading ? (
                    <Skeleton active paragraph={{ rows: 1 }} title={false} />
                  ) : (
                    <h2>{product?.title}</h2>
                  )}

                  <div className="review-rating-wrap">
                    {loading ? (
                      <Skeleton
                        active
                        paragraph={{ rows: 1 }}
                        title={false}
                        className="review_rating_wrap_skeleton"
                      />
                    ) : (
                      <>
                        {product?.rating > 0 && (
                          <div className="left-rating">
                            <Rate
                              disabled
                              allowHalf
                              defaultValue={parseFloat(product?.rating)}
                            />
                            <p>
                              {product?.rating}{" "}
                              <span>({product?.rating_count} Reviews)</span>
                            </p>
                          </div>
                        )}
                        <div className="share-icons">
                          <p>Share :</p>
                          <Button
                            type="text"
                            className="share_item"
                            onClick={() => shareProduct("facebook")}
                          >
                            <img
                              src={image["facebook-new.png"]}
                              alt="facebook"
                            />
                          </Button>
                          <Button
                            type="text"
                            className="share_item"
                            onClick={() => shareProduct("twitter")}
                          >
                            <img src={image["twitter-new.png"]} alt="twitter" />
                          </Button>
                          <Button
                            type="text"
                            className="share_item"
                            onClick={() => shareProduct("whatsapp")}
                          >
                            <img
                              src={image["whatsapp-new.png"]}
                              alt="whatsapp"
                            />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="price-container">
                    {loading ? (
                      <Skeleton active paragraph={{ rows: 1 }} title={false} />
                    ) : (
                      <>
                        {currentWeight ? (
                          currentWeight.discount_price &&
                          parseFloat(currentWeight.discount_price) <
                            parseFloat(currentWeight.regular_price) ? (
                            <div className="price-wrapper">
                              <h3 className="discounted-price">
                                ₹{currentWeight.discount_price}
                                <span className="original-price struck">
                                  ₹{currentWeight.regular_price}
                                </span>
                              </h3>
                              {currentWeight.discount_percentage && (
                                <span className="discount-badge">
                                  {currentWeight.discount_percentage}
                                </span>
                              )}
                              <span className="gst-text">
                                (Inclusive of GST)
                              </span>
                            </div>
                          ) : (
                            <div className="price-wrapper">
                              <h3>₹{currentWeight.regular_price}</h3>
                              <span className="gst-text">
                                (Inclusive of GST)
                              </span>
                            </div>
                          )
                        ) : (
                          <div className="price-wrapper">
                            {product?.discount_price &&
                            parseFloat(product.discount_price) <
                              parseFloat(product?.regular_price) ? (
                              <>
                                <h3 className="discounted-price">
                                  ₹{product.discount_price}
                                  <span className="original-price struck">
                                    ₹{product.regular_price}
                                  </span>
                                </h3>
                                {product?.discount_percentage && (
                                  <span className="discount-badge">
                                    {product.discount_percentage}
                                  </span>
                                )}
                              </>
                            ) : (
                              <h3>₹{product?.regular_price}</h3>
                            )}
                            <span className="gst-text">(Inclusive of GST)</span>
                          </div>
                        )}
                        <Button
                          type="text"
                          onClick={handleWishlistToggle}
                          className="wishlist-btn"
                          // loading={wishlistLoading}
                        >
                          {isInWishlist ? (
                            <HeartFilled style={{ color: "red" }} />
                          ) : (
                            <HeartOutlined style={{ color: "red" }} />
                          )}
                          Add to Wishlist
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="description">
                    {loading ? (
                      <Skeleton active paragraph={{ rows: 3 }} title={false} />
                    ) : (
                      <p>
                        {product?.short_decripation.replace(/<[^>]*>/g, "")}
                      </p>
                    )}
                  </div>

                  <div className="egg-type-section">
                    {loading ? (
                      <Skeleton active paragraph={{ rows: 1 }} title={false} />
                    ) : (
                      product?.eggless != "" && (
                        <Radio.Group
                          value={eggType}
                          onChange={(e) => setEggType(e.target.value)}
                          className="egg-type-buttons"
                        >
                          {product?.eggless !== "Yes" && (
                            <Radio.Button className="with-egg" value="with">
                              <Withegg /> With Egg
                            </Radio.Button>
                          )}
                          {product?.eggless === "Yes" && (
                            <Radio.Button
                              className="without-egg"
                              value="without"
                            >
                              <Withoutegg /> Eggless
                            </Radio.Button>
                          )}
                        </Radio.Group>
                      )
                    )}
                  </div>

                  {/* Update the weight selection section */}
                  {loading ? (
                    <div className="weight-selection">
                      <Skeleton active paragraph={{ rows: 1 }} title={false} />
                      <div className="weight-options">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton.Button
                            key={i}
                            active
                            shape="round"
                            className="product_details_weight_skeleton"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    apiWeights.length > 0 && (
                      <div className="weight-selection">
                        <h3>Select Weight</h3>
                        <div className="weight-options">
                          {apiWeights.map((w) => {
                            const weightDetails = product.product_weight.find(
                              (pw) => pw.weight_id.toString() === w.value
                            );
                            const isOutOfStock = weightDetails?.outofstock;

                            return (
                              <Button
                                key={w.value}
                                type={
                                  weight === w.value ? "primary" : "default"
                                }
                                onClick={() =>
                                  !isOutOfStock && setWeight(w.value)
                                }
                                className={`weight-btn ${
                                  isOutOfStock ? "out-of-stock" : ""
                                }`}
                                disabled={isOutOfStock}
                              >
                                {w.label}
                                {isOutOfStock && (
                                  <span className="stock-label">
                                    Out of Stock
                                  </span>
                                )}
                                {w.discountedPrice && (
                                  <span className="weight-price">
                                    ₹{w.discountedPrice}
                                  </span>
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}

                  {/* START: FLAVOR DROPDOWN SECTION */}
                  {!loading && product?.flavours?.length > 0 && (
                    <div
                      className="flavor-selection common-inputs"
                      ref={flavorRef}
                    >
                      <h3>Select Flavour</h3>
                      <Select
                        placeholder="Select a Flavour"
                        onChange={(value) => {
                          setFlavor(value);
                          if (errors.flavor) {
                            setErrors((prev) => ({ ...prev, flavor: "" }));
                          }
                        }}
                        value={flavor || undefined}
                        disabled={isOutOfStock}
                        style={{ width: "100%" }}
                      >
                        {product?.flavours.map((f) => (
                          <Option key={f.id} value={f.id}>
                            {f.title}
                          </Option>
                        ))}
                      </Select>
                      {errors.flavor && (
                        <div className="error-message">{errors.flavor}</div>
                      )}
                    </div>
                  )}
                  {/* END: FLAVOR DROPDOWN SECTION */}

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <div className="common-inputs" ref={pincodeRef}>
                        {loading ? (
                          <Skeleton.Input active block />
                        ) : (
                          <>
                            <h3>
                              Gift Receiver's Location{" "}
                              <span>(Check Availability)</span>
                            </h3>
                            <Input
                              placeholder="Enter Receiver pincode"
                              disabled={isOutOfStock}
                              value={pincode}
                              onChange={(e) => {
                                setPincode(e.target.value);
                                if (errors.pincode) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    pincode: "",
                                  }));
                                }
                              }}
                            />

                            <div className="icon">
                              <Location />
                            </div>
                          </>
                        )}
                        {errors.pincode && (
                          <div className="error-message-absolute error-message">
                            {errors.pincode}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="common-inputs" ref={deliveryDateRef}>
                        {loading ? (
                          <Skeleton.Input active block />
                        ) : (
                          <>
                            <h3>Select Delivery Date & Time Slot</h3>

                            <Input
                              readOnly
                              block
                              onClick={() => setIsSlotModalVisible(true)}
                              icon={<CalendarOutlined />}
                              className="date-time-button"
                              placeholder="Select  Delivery Date & Time Slot"
                              disabled={isOutOfStock}
                              onChange={(e) => {
                                setPincode(e.target.value);
                                if (errors.pincode) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    pincode: "",
                                  }));
                                }
                              }}
                              value={
                                deliveryDate && selectedSlot
                                  ? `${deliveryDate.format(
                                      "ddd, MMM D"
                                    )} | ${getSelectedSlotTime()}`
                                  : ""
                              }
                            />

                            <div className="icon">
                              <CalendarOutlined />
                            </div>

                            {errors.deliveryDate && (
                              <div className=" error-message-absolute error-message">
                                {errors.deliveryDate}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <div className="common-inputs">
                    {loading ? (
                      <Skeleton.Input active block />
                    ) : (
                      <>
                        <h3>Message Note</h3>
                        <Input
                          maxLength={25}
                          placeholder="Enter Message Note"
                          disabled={isOutOfStock}
                          onChange={(e) => setCakeMessage(e.target.value)}
                        />
                        <div className="icon">
                          <Cakes />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="quantity-wrap">
                    {loading ? (
                      <Skeleton active paragraph={{ rows: 1 }} title={false} />
                    ) : (
                      <>
                        <h3>Quantity :</h3>
                        <div className="quantity-controls">
                          <Button
                            onClick={() => {
                              const newErrors = {};
                              if (!deliveryDate && pincode) {
                                newErrors.deliveryDate =
                                  "Please select a delivery date";
                              }

                              if (!pincode) {
                                newErrors.pincode = "Please enter a pincode";
                              }

                              setErrors(newErrors);
                              setQuantity(quantity > 1 ? quantity - 1 : 1);
                            }}
                            disabled={isOutOfStock}
                          >
                            -
                          </Button>
                          <span className="quantity-number">{quantity}</span>
                          <Button
                            onClick={() => {
                              const newErrors = {};
                              if (!deliveryDate && pincode) {
                                newErrors.deliveryDate =
                                  "Please select a delivery date and time slot.";
                              }

                              if (!pincode) {
                                newErrors.pincode = "Please enter a pincode";
                              }

                              if (product?.flavours?.length > 0 && !flavor) {
                                newErrors.flavor = "Please select  flavor";
                              }

                              setErrors(newErrors);
                              setQuantity(quantity + 1);
                            }}
                            disabled={isOutOfStock}
                          >
                            +
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="action-buttons">
                    {loading ? (
                      <>
                        <Skeleton.Button active size="large" block />
                        <Skeleton.Button active size="large" block />
                      </>
                    ) : currentWeight?.outofstock || product?.outofstock ? (
                      <Button className="out-of-stock-btn" disabled>
                        <ExclamationCircleFilled style={{ fontSize: "18px" }} />
                        Out of Stock
                      </Button>
                    ) : (
                      <>
                        <Button
                          className="add-cart-btn"
                          onClick={() => handleAddToCart()}
                          loading={cartLoading}
                        >
                          Add to Cart
                        </Button>
                        {product?.addon_flag && (
                          <Button
                            className="buy-btn"
                            onClick={() => handleAddToCart(true)}
                            loading={cartLoading}
                          >
                            Buy Now
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>

            <div className="product-tab-section">
              {loading ? (
                <Skeleton active paragraph={{ rows: 5 }} />
              ) : (
                <Tabs defaultActiveKey="1" centered className="custom-tabs">
                  <TabPane tab="DESCRIPTION" key="1">
                    <div className="discription-content">
                      <h3>About this item</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product?.description,
                        }}
                      />
                    </div>
                  </TabPane>

                  <TabPane tab="PRODUCT DETAILS" key="2">
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.more_info }}
                    />
                  </TabPane>

                  <TabPane tab="REVIEW & RATING" key="3">
                    <div className="rating-container">
                      {loading ? (
                        <Skeleton active paragraph={{ rows: 4 }} />
                      ) : (
                        <>
                          <div className="overall-box">
                            <h3>Overall Rating</h3>
                            <Row
                              gutter={16}
                              justify={"center"}
                              align={"bottom"}
                            >
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <h2>{product?.rating || "0"} / 5.0</h2>
                                <Rate
                                  disabled
                                  value={parseFloat(product?.rating) || 0}
                                  className="left-overall-star"
                                />
                                <p>
                                  based on {product?.rating_total || 0} reviews
                                </p>
                              </Col>
                              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                <Row gutter={24} justify={"end"}>
                                  <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                                    {product?.rating_sort?.map((rating) => (
                                      <p key={rating.value}>{rating.text}</p>
                                    ))}
                                  </Col>
                                  <Col xs={24} sm={12} md={12} lg={9} xl={8}>
                                    {product?.rating_sort?.map((rating) => (
                                      <div
                                        key={rating.value}
                                        className="rating-number"
                                      >
                                        <Rate disabled value={rating.value} />
                                        <p>{rating.count || 0}</p>
                                      </div>
                                    ))}
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>

                          {product?.reviews?.length > 0 ? (
                            product.reviews.map((review, index) => (
                              <div key={index} className="user-review">
                                <div className="profile-info">
                                  <div className="left-img">
                                    <img
                                      src={
                                        review.image ||
                                        image["user-default.png"]
                                      }
                                      alt={review.full_name || "User"}
                                    />
                                    <h3>{review.full_name || "Anonymous"}</h3>
                                  </div>
                                  <h4>{review.date}</h4>
                                </div>
                                <Rate
                                  disabled
                                  value={parseInt(review.rating)}
                                />
                                <p>{review.description}</p>

                                {/* Review images if available */}
                                {review.images?.length > 0 && (
                                  <div className="review-images">
                                    {review.images.map((img, idx) => (
                                      <img
                                        key={idx}
                                        src={img.url}
                                        alt={
                                          img.alt || `Review image ${idx + 1}`
                                        }
                                        className="review-thumbnail"
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="no-reviews">
                              <p>No reviews yet</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </TabPane>
                </Tabs>
              )}
            </div>

            {loading ? (
              <div className="recently-viewed">
                <Skeleton
                  active
                  paragraph={{ rows: 1 }}
                  title={{ width: "30%" }}
                />
                <Row gutter={24}>
                  {[...Array(4)].map((_, i) => (
                    <Col xs={24} sm={24} md={12} lg={6} xl={6} key={i}>
                      <Skeleton.Image active className="product-card-shimmer" />
                      <Skeleton
                        active
                        paragraph={{ rows: 5 }}
                        title={false}
                        style={{ marginTop: 20, marginBottom: 20 }}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              product?.similarproducts?.length > 0 && (
                <div className="recently-viewed">
                  <div className="common-heading">
                    <h3>
                      <span>Recently</span> Viewed
                    </h3>
                  </div>
                  <Row gutter={24}>
                    {product.similarproducts.map((item) => (
                      <Col xs={24} sm={24} md={12} lg={6} xl={6} key={item.id}>
                        <Productcard product={item} />
                      </Col>
                    ))}
                  </Row>
                </div>
              )
            )}
          </div>
        </Loading>
      </div>
      {/* Add to Cart Modal */}

      <Modal
        title={
          <div className="modal-title-wrapper">
            {modalView === "slots" && (
              <Button
                type="text"
                shape="circle"
                icon={<ArrowLeftOutlined />}
                className="back-btn"
                onClick={() => setModalView("calendar")}
              />
            )}
            <span>
              {modalView === "calendar"
                ? "Select a Date"
                : "Select a Time Slot"}
            </span>
          </div>
        }
        visible={isSlotModalVisible}
        onOk={handleSlotModalOk}
        onCancel={() => setIsSlotModalVisible(false)}
        footer={[
          <Button
            key="back"
            className="select_delivery_date_cancel_btn"
            onClick={() => setIsSlotModalVisible(false)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="select_delivery_date_confirm_btn"
            onClick={handleSlotModalOk}
            disabled={!selectedSlot}
          >
            Confirm
          </Button>,
        ]}
        width={500} // A refined width
        className="delivery-slot-modal-wrapper"
      >
        {/* This is the new, structured modal content */}
        <div className="delivery-slot-modal-content">
          {/* VIEW 1: CALENDAR */}
          <div
            className={`view-wrapper ${
              modalView === "calendar" ? "visible" : ""
            }`}
          >
            <div className="calendar-container">
              <Calendar
                fullscreen={false}
                onSelect={(date) => {
                  setDeliveryDate(date);
                  fetchDeliverySlots(date);
                  setSelectedShipping(null);
                  setSelectedSlot(null);
                  if (errors.deliveryDate) clearErrors("deliveryDate");
                  setModalView("slots");
                }}
                disabledDate={(current) => {
                  if (!current) return false;
                  let firstAvailableDate = moment().startOf("day");
                  if (product?.delivery_after_days > 0) {
                    firstAvailableDate = moment()
                      .add(product.delivery_after_days, "days")
                      .startOf("day");
                  }
                  return current < firstAvailableDate;
                }}
                value={deliveryDate}
              />
            </div>
          </div>

          {/* VIEW 2: SLOTS - COMPLETELY REDESIGNED */}
          <div
            className={`view-wrapper ${modalView === "slots" ? "visible" : ""}`}
          >
            {slotLoading ? (
              <div className="slot-loader">
                <Spin tip="Finding Slots..." />
              </div>
            ) : (
              <div className="slots-container">
                {/* CONTEXT: Show the selected date */}
                <div className="selected-date-header">
                  Delivery for{" "}
                  <strong>
                    {deliveryDate
                      ? deliveryDate.format("dddd, MMMM Do")
                      : "..."}
                  </strong>
                </div>

                {deliverySlots.length > 0 ? (
                  <div className="shipping-methods-container">
                    {deliverySlots.map((shipping) => {
                      const isSelected =
                        selectedShipping === shipping.shipping_id;
                      return (
                        <div
                          key={shipping.shipping_id}
                          className={`shipping-card ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => {
                            setSelectedShipping(shipping.shipping_id);
                            setSelectedSlot(null);
                          }}
                        >
                          <div className="card-header">
                            <div className="shipping-icon">
                              <ClockCircleOutlined />
                            </div>
                            <div className="shipping-info">
                              <span className="shipping-title">
                                {shipping.title}{" "}
                                <span className="shipping-price">
                                  (₹{shipping.value})
                                </span>
                              </span>
                            </div>

                            <div className="selection-indicator">
                              {/* {isSelected ? (
                                <CheckCircleFilled />
                              ) : (
                                <CheckCircleFilled />
                              )} */}
                            </div>

                            <div className="radio-icon">
                              {isSelected ? (
                                <CheckCircleFilled />
                              ) : (
                                <CheckCircleOutlined />
                              )}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="time-slots-wrapper">
                              <p className="time-slots-title">
                                Available Slots
                              </p>
                              <Radio.Group
                                onChange={(e) =>
                                  setSelectedSlot(e.target.value)
                                }
                                value={selectedSlot}
                                className="time-slots-grid"
                              >
                                {shipping.slots.map((slot) => (
                                  <Radio.Button
                                    key={slot.slot_id}
                                    value={slot.slot_id}
                                    className="slot-button"
                                  >
                                    {slot.start_time} - {slot.end_time}
                                  </Radio.Button>
                                ))}
                              </Radio.Group>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-slots-message">
                    <InfoCircleFilled />
                    <p>No delivery slots available for this date.</p>
                    <span>Please try selecting another day.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>

      <AddonModal
        addonModal={addonModal}
        setAddonModal={setAddonModal}
        product={product}
        onContinue={handleContinueWithAddons}
      />
    </>
  );
};

export default ProductDetails;
