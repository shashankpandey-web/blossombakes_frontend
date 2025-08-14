import { Col, Row, Skeleton } from 'antd'
import React from 'react'
import image from '../../utils/helpers'
import {
  Calendar,
  Checkout,
  Delivery,
  DownArrow,
  FastShipping,
  HelpCenter,
  Satifaction,
  Star,
  User,
  WhiteShape,
} from "../../icon/icons";

const WhyChooseUs = ({data,loading}) => {
  return (
    <section className="why-choose-us-wrapper">
        <img
          className="left-shade"
          src={image["client-card-shade.png"]}
          alt="shade"
        />
        <img
          className="right-shade"
          src={image["client-card-shade.png"]}
          alt="shade"
        />
        <div className="container">
          <Row gutter={24} align="middle">
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="left-details">
                {loading ? (
                  <>
                    <Skeleton.Button
                      active
                      size="large"
                      style={{
                        width: 250,
                        height: 38,
                        marginBottom: 10,
                        display: "block",
                      }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: 300,
                        height: 22,
                        display: "block",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h3 data-aos="fade-right" data-aos-delay="60">
                      {data?.why_text} <span>{data?.choose_text}</span>{" "}
                      {data?.us_text}
                    </h3>
                    <p data-aos="fade-right" data-aos-delay="80">
                      {data?.why_choose_us_text}
                    </p>
                  </>
                )}
              </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <div className="right-media-wrap">
                <img
                  data-aos="fade-left"
                  data-aos-delay="60"
                  src={image["why-choose-banner.png"]}
                  alt="banner"
                />
              </div>
            </Col>
          </Row>
          <div className="why-choose-points">
            <div className="common-points-card">
              <div className="round-bg">
                <div className="image-wrapper">
                  <FastShipping />
                </div>
              </div>
              <p>{data?.free_fast_shipping}</p>
            </div>
            <div className="common-points-card">
              <div className="round-bg">
                <div className="image-wrapper">
                  <Delivery />
                </div>
              </div>
              <p> {data?.late_night_delivery}</p>
            </div>
            <div className="common-points-card">
              <div className="round-bg">
                <div className="image-wrapper">
                  <Satifaction />
                </div>
              </div>
              <p>{data?.satisfaction_guarantee}</p>
            </div>
            <div className="common-points-card">
              <div className="round-bg">
                <div className="image-wrapper">
                  <Checkout />
                </div>
              </div>
              <p> {data?.secure_checkout}</p>
            </div>
            <div className="common-points-card">
              <div className="round-bg">
                <div className="image-wrapper">
                  <HelpCenter />
                </div>
              </div>
              <p>{data?.dedicated_help_center}</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default WhyChooseUs