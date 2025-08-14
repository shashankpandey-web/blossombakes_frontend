import React, { useContext, useState } from "react";
import "./shoppingcart.scss";
import { Address, Breadcrumbs, Cart, Coupon } from "../../component";
import { HomeOutlined } from "@ant-design/icons";
import { Col, Input, Row, Skeleton, Steps } from "antd";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import image from "../../utils/helpers";
import { Cross, Plus, Shield, Call, Email } from "../../icon/icons";
import { ShoppingCartContext } from "../../context";
import EmptyCart from "../../component/empty_cart";
import Payment from "../../component/shoppingCart/payment/payment";
import { useSelector } from "react-redux";
import Loading from "../../component/Loader/Loading";
import { usePageSEO } from "../../hooks/usePageSEO/usePageSEO";
import SEO from "../../component/SEO/SEO";

const shoopingCart = () => {
  const {
    cart_list,
    cart_total,
    cartLoading,
    coupon_list,
    applied_coupon_code,
    placeOrder,
    currentStep: current,
    setCurrentStep: setCurrent,
    handleStepChange,
    addressData,
    isProcessing,
    isUserLogin,
    isCheckoutPayProcessing,
    checkoutcart,
  } = useContext(ShoppingCartContext);
  const { setting, loading } = useSelector((state) => state.setting);

  const { Step } = Steps;

  const [couponModal, setcouponModal] = useState(false);
  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "My Cart", href: "/shoppingcart", active: true },
  ];
  const steps = [
    {
      title: "Cart",
    },
    {
      title: "Address",
    },
    {
      title: "Payment",
    },
  ];
  const { seoData } = usePageSEO("shoppingcart");

  
  if (cart_list.length === 0 && cartLoading == false) {
    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <EmptyCart />
      </Col>
    );
  }


  return (
    <>
      <SEO
        title={seoData?.meta_title}
        description={seoData?.meta_description}
        keywords={seoData?.meta_keywords}
      />

      <Loading isLoading={isCheckoutPayProcessing || isProcessing}>
        <div className="shopping-wrapper">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="container">
            <div className="step-wrapper">
              <Steps
                current={current}
                className="custom-step"
                onChange={(value) => {
                  if (value == 2 && !addressData) {
                    errorMsg("Please complete address details first");
                    return;
                  }
                  setCurrent(value);
                }}
              >
                {steps.map((item, index) => (
                  <Step
                    key={index}
                    title={item.title}
                    disabled={index === 2 || (!isUserLogin && index === 1)}
                  />
                ))}
              </Steps>
            </div>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={13} lg={16} xl={16}>
                {current === 0 && <Cart />}
                {current === 1 && <Address />}
                {current === 2 && <Payment />}
              </Col>

              <Col xs={24} sm={24} md={11} lg={8} xl={8}>
                <div className="right-sticky-container">
                  {current === 1 && (
                    <div className="order-summary">
                      {cart_list?.length > 0 && (
                        <>
                          <h3>Order Summary</h3>
                          <table>
                            {cart_list.map((item) => (
                              <tr>
                                <td>
                                  <p>{item?.name}</p>
                                </td>
                                <td>
                                  <h4>x {item?.quantity}</h4>
                                </td>
                                <td>
                                  <h4>₹{item?.regular_price}</h4>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </>
                      )}
                    </div>
                  )}

                  {cart_total?.length > 0 && !cartLoading ? (
                    <div className="cart-total-content">
                      <h3>Cart Total</h3>
                      <ul>
                        {cart_total.map((item) => (
                          <li
                            className={
                              item?.code == "total" ? "total-wrap" : ""
                            }
                          >
                            <p>{item?.title}:</p>
                            <h4>₹{item?.value}</h4>
                          </li>
                        ))}
                      </ul>
                      <div className="coupon-container">
                        <div className="coupon-header">
                          <h3>Coupon Code</h3>
                          <Link onClick={() => setcouponModal(true)}>
                            View Available Coupon
                          </Link>
                        </div>
                        <div className="input-coupon">
                          <Input
                            placeholder="Select Coupon code"
                            name="coupon"
                            value={applied_coupon_code}
                          />
                          <button className="apply-btn">
                            {applied_coupon_code ? "Applied" : "Apply Coupon"}
                          </button>
                        </div>
                        {current === 0 ? (
                          <button
                            // handleStepChange(1)
                            className="proceed-btn"
                            // onClick={() => setCurrent(1)}
                            onClick={() => {
                              checkoutcart();
                            }}
                          >
                            Proceed to checkout
                          </button>
                        ) : current === 2 ? (
                          <button
                            className="proceed-btn"
                            disabled={isProcessing}
                            onClick={() => placeOrder()}
                          >
                            {isProcessing ? "Processing..." : "Place Order"}
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    <Skeleton active paragraph={{ rows: 10 }} />
                  )}

                  {current === 1 && (
                    <>
                      <div className="pay-protection-wrap">
                        <Shield />
                        <p>100% Payment Protection</p>
                      </div>
                      <div className="secure-tag">
                        <img src={image["feature-tags.png"]} alt="banner" />
                      </div>
                      <div className="need-help">
                        <h3>Need Help?</h3>
                        <p>
                          <Call /> {setting?.footer_phone_4}
                        </p>
                        <p>
                          <Email />
                          {setting?.footer_email_4}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Col>
            </Row>
            {/* {current === 0 && (
              <div className="extra-item-wrapper">
                <h3>Make It Extra Special With</h3>
                <div className="extra-slider-container">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      576: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      992: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                      },
                      1200: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                      },
                    }}
                  >
                    <SwiperSlide>
                      <div className="common-addon-card">
                        <img src={image["addon-1.png"]} alt="addon" />
                        <h3>Number Candles</h3>
                        <div className="price-wrap">
                          <p>₹29/Candles</p>
                          <button className="plus-btn">
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="common-addon-card">
                        <img src={image["addon-2.png"]} alt="addon" />
                        <h3>Number Candles</h3>
                        <div className="price-wrap">
                          <p>₹29/Candles</p>
                          <button className="plus-btn">
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="common-addon-card">
                        <img src={image["addon-3.png"]} alt="addon" />
                        <h3>Number Candles</h3>
                        <div className="price-wrap">
                          <p>₹29/Candles</p>
                          <button className="plus-btn">
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="common-addon-card">
                        <img src={image["addon-1.png"]} alt="addon" />
                        <h3>Number Candles</h3>
                        <div className="price-wrap">
                          <p>₹29/Candles</p>
                          <button className="plus-btn">
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="common-addon-card">
                        <img src={image["addon-2.png"]} alt="addon" />
                        <h3>Number Candles</h3>
                        <div className="price-wrap">
                          <p>₹29/Candles</p>
                          <button className="plus-btn">
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="common-addon-card">
                        <img src={image["addon-3.png"]} alt="addon" />
                        <h3>Number Candles</h3>
                        <div className="price-wrap">
                          <p>₹29/Candles</p>
                          <button className="plus-btn">
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </Loading>
      <Coupon
        couponModal={couponModal}
        setcouponModal={setcouponModal}
        coupon_list={coupon_list}
      />
    </>
  );
};

export default shoopingCart;
