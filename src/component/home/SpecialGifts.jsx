import React from "react";
import CelebrationCards from "./celebration_cards/CelebrationCards";
import image from "../../utils/helpers";
import { Col, Row, Skeleton } from "antd";

const SpecialGifts = ({ data, sectionData, loading }) => {
  return (
    <section className="surprise-celebration-wrapper">
      <div className="container">
        <div className="common-heading" data-aos="fade-up">
          {loading ? (
            <>
              <Skeleton.Input
                active
                size="large"
                style={{
                  width: 300,
                  height: 32,
                  marginBottom: 8,
                }}
              />
              <Skeleton.Input
                active
                size="small"
                style={{
                  width: 200,
                  height: 20,
                }}
              />
            </>
          ) : (
            <h3>
              {data?.surprises_for_every_text}{" "}
              <span>{data?.celebration_with_text}</span>
            </h3>
          )}
        </div>
        {loading ? (
          <Row gutter={[24, 30]}>
            {[...Array(6)].map((_, index) => (
              <Col
                key={`skeleton-${index}`}
                xs={12}
                sm={8}
                md={8}
                lg={6}
                xl={4}
              >
                <div className="common-cele">
                  <Skeleton.Avatar
                    active
                    shape="square"
                    size="large"
                    style={{ width: "100%", height: 180 }}
                  />
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: "80%", marginTop: 10 }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <CelebrationCards cards={sectionData || []} loading={loading} />
        )}
      </div>
      {!loading && (
        <img
          className="shape-left"
          src={image["shape-1.png"]}
          alt="shape"
          data-aos="fade-right"
          data-aos-delay="60"
        />
      )}
    </section>
  );
};

export default React.memo(SpecialGifts);
