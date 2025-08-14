import React from "react";
import "./about.scss";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumbs, Productcard } from "../../component";
import image from "../../utils/helpers";
import { Col, Row, Skeleton } from "antd";
import { useAboutUtils } from "./useAboutUtils";
import SEO from "../../component/SEO/SEO";

const About = () => {
  const { aboutData, loading } = useAboutUtils();

  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "About Us", href: "/about", active: true },
  ];

  return (
    <>
    <SEO
        title={aboutData?.meta_title}
        description={aboutData?.meta_description}
        keywords={aboutData?.meta_keywords}
      />

    <div className="about-wrapper">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container">
        {loading ? (
          <>
            <Skeleton.Image active className="banner-skeleton" />
            <Skeleton active paragraph={{ rows: 8 }} />
          </>
        ) : aboutData ? (
          <>
            <div className="top-banner">
              <img src={image["about-banner.png"]} alt="about banner" />
            </div>

            <div className="about-title">
              <h3>{aboutData.about_us_title}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: aboutData.about_us_text }}
                className="about-content"
              />
            </div>

            {aboutData?.best_selling_products?.length > 0 && (
              <div className="recently-viewed">
                <div className="common-heading">
                  <h3>
                    <span>{aboutData.best_selling_text}</span>{" "}
                    {aboutData.product_text}
                  </h3>
                </div>
                <Row gutter={24}>
                  {aboutData.best_selling_products.map((product) => (
                    <Col xs={24} sm={24} md={12} lg={6} xl={6} key={product.id}>
                      <Productcard product={product} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
    </>
  );
};

export default About;
