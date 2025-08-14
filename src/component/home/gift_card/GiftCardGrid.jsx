import React from "react";
import { Row, Col, Skeleton } from "antd";
import { Star } from "../../../icon/icons";
import { useNavigate } from "react-router-dom";

const GiftCardGrid = ({ cards, loading }) => {
  const navigate = useNavigate();
  // if (loading) {
  //   return (
  //     <Row gutter={16}>
  //       {[1, 2, 3, 4].map((item) => (
  //         <Col key={item} xs={24} sm={12} md={12} lg={6} xl={6}>
  //           <div className="gift-common-card">
  //             <Skeleton.Image
  //               active
  //               style={{ width: "100%", height: "200px" }}
  //             />
  //             <Skeleton
  //               active
  //               paragraph={{ rows: 3 }}
  //               style={{ marginTop: "15px" }}
  //             />
  //           </div>
  //         </Col>
  //       ))}
  //     </Row>
  //   );
  // }


   if (loading) {
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
    <Row gutter={16}>
      {cards.map((card) => (
        <Col key={card.id} xs={24} sm={12} md={12} lg={6} xl={6}>
          <div
            className="gift-common-card gift_____card"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <div className="gradient-bg">
              <img src={card.image} alt={card.title} />
            </div>

            <div className="price-tag">
              <p className="original-price">₹{card.regular_price}</p>
              {/* {card.regular_price !== card.discount_price && (
                <p className="original-price">₹{card.regular_price}</p>
              )} */}
            </div>

            <div className="rating-wrap">
              {(card.rating > 0 ) && (
              <div className="rating-text">
                <Star />
                <p>
                  ({card.rating || "0"}) {card.rating_count || "0"} reviews
                </p>
              </div>

              )}
            </div>

            <h3 className="head">
              {card.title.length > 30
                ? `${card.title.slice(0, 30)}...`
                : card.title}{" "}
            </h3>

            <p className="desc">
              {card?.short_decripation?.length > 120
                ? `${card?.short_decripation.slice(0, 120)}...`
                : card?.short_decripation}{" "}
            </p>

            <button
              className="order-btn"
              onClick={() => navigate(`/productdetail/${card?.slug}`)}
            >
              Order Now
            </button>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default GiftCardGrid;
