import { Col, Row, Skeleton } from "antd";
import React from "react";
import image from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const CakeGiftShowcase = ({ data, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="cake-gift-showcase">
        <div className="container">
          <div className="common-heading">
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
          </div>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Skeleton.Image active style={{ width: "100%", height: 400 }} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Row gutter={[24, 24]}>
                {[...Array(4)].map((_, index) => (
                  <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Skeleton.Node
                      active
                      style={{
                        width: "100%",
                        height: 180,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 120, margin: 20 }}
                      />
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 80, margin: 20 }}
                      />
                    </Skeleton.Node>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </section>
    );
  }

  return (
    <section className="cake-gift-showcase">
      <div className="container">
        <div className="common-heading">
          <h3 data-aos="fade-up">
            <span>{data?.cakes_gifts_text}</span> {data?.that_wow_text}
          </h3>
        </div>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className="left-model-img" data-aos="fade-right">
              <img
                src={data?.cakes_gifts_categories_banner}
                alt="banner"
                loading="lazy"
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div
                  className="card-right-1"
                  data-aos="fade-left"
                  data-aos-delay="60"
                  style={{
                    backgroundImage: `url(${data?.cakes_gifts_categories_banner_1})`,
                  }}
                >
                  <p>{data?.cakes_gifts_text_1}</p>
                  <h3> {data?.cakes_gifts_sub_text_1}</h3>
                  {data?.cakes_gifts_categories_1 && (
                    <button
                      className="order-btn"
                      onClick={() =>
                        navigate(`/category/${data?.cakes_gifts_categories_1}`)
                      }
                    >
                      Order Now
                    </button>
                  )}
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div
                  className="card-right-2"
                  data-aos="fade-left"
                  data-aos-delay="80"
                  style={{
                    backgroundImage: `url(${data?.cakes_gifts_categories_banner_2})`,
                  }}
                >
                  <p>{data?.cakes_gifts_text_2}</p>
                  <h3> {data?.cakes_gifts_sub_text_2}</h3>

                   {data?.cakes_gifts_categories_2 && (
                    <button
                      className="order-btn"
                      onClick={() =>
                        navigate(`/category/${data?.cakes_gifts_categories_2}`)
                      }
                    >
                      Order Now
                    </button>
                  )}

                  
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div
                  className="card-right-3"
                  data-aos="fade-left"
                  data-aos-delay="100"
                  style={{
                    backgroundImage: `url(${data?.cakes_gifts_categories_banner_3})`,
                  }}
                >
                  <p>{data?.cakes_gifts_text_3}</p>
                  <h3> {data?.cakes_gifts_sub_text_3}</h3>
                    {data?.cakes_gifts_categories_3 && (
                    <button
                      className="order-btn"
                      onClick={() =>
                        navigate(`/category/${data?.cakes_gifts_categories_3}`)
                      }
                    >
                      Order Now
                    </button>
                  )}
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div
                  className="card-right-4"
                  data-aos="fade-left"
                  data-aos-delay="120"
                  style={{
                    backgroundImage: `url(${data?.cakes_gifts_categories_banner_4})`,
                  }}
                >
                  <p>{data?.cakes_gifts_text_4}</p>
                  <h3> {data?.cakes_gifts_sub_text_4}</h3>

                   {data?.cakes_gifts_categories_4 && (
                    <button
                      className="order-btn"
                      onClick={() =>
                        navigate(`/category/${data?.cakes_gifts_categories_4}`)
                      }
                    >
                      Order Now
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default CakeGiftShowcase;
