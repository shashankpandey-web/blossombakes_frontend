import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Row, Col, Skeleton, Rate } from "antd";
// import { Rate } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import image from "../../utils/helpers";

const ClientTestimonials = ({ data, loadingStates, sectionData, loading }) => {
  if (
    !loadingStates["order_reviews_list"] &&
    (!sectionData["order_reviews_list"] ||
        (!Array.isArray(sectionData["order_reviews_list"]) ||
    sectionData["order_reviews_list"].length === 0))
  ) {
    return null;
  }

  if (loadingStates["order_reviews_list"]) {
    return (
      <section className="blog-wrapper">
        <div className="container">
          <Row gutter={16}>
            {[1, 2, 3].map((item) => (
              <Col
                key={`blog-skeleton-${item}`}
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={8}
              >
                <div className="common-blog-cards">
                  <Skeleton.Image
                    active
                    style={{
                      width: "100%",
                      height: 240,
                      marginBottom: "10px",
                    }}
                  />
                  <div className="user-info">
                    <Skeleton active paragraph={{ rows: 0 }} />
                    <Skeleton active paragraph={{ rows: 0 }} />
                  </div>
                  <Skeleton
                    active
                    paragraph={{ rows: 1 }}
                    style={{ marginTop: 15 }}
                  />
                  <Skeleton active paragraph={{ rows: 2 }} />
                  <Skeleton.Button
                    active
                    size="small"
                    style={{ width: 100, marginTop: 10 }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    );
  }

  return (
    <section className="our-client-wrapper">
      <div className="container">
        <div className="common-heading">
          {loading ? (
            <>
              <Skeleton.Input
                active
                size="large"
                style={{ width: 300, height: 32, marginBottom: 8 }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{ width: 200, height: 20 }}
              />
            </>
          ) : (
            <>
              <h3 data-aos="fade-up">
                {data?.what_text}<span> {data?.our_clients_text}</span> {data?.says_about_us_text}
              </h3>
            </>
          )}
        </div>
        <Swiper
          slidesPerView={4}
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
              slidesPerView: 2,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {(sectionData['order_reviews_list'] || [])?.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="common-client-cards">
                <div className="profile">
                  <img src={review.image} alt="profile" />
                  <div className="user-detail">
                    <h3>{review?.full_name}</h3>
                    <p>Customer</p>
                  </div>
                </div>
                <div className="comment">
                  <p>{review?.description}</p>
                </div>
                <Rate value={Number(review?.rating)} disabled />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientTestimonials;
