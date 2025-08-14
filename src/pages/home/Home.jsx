import React from "react";
import "./style.scss";
import { Col, Row, Carousel, Rate, Skeleton } from "antd";
import image from "../../utils/helpers";
import { CelebrationCards, GiftCardGrid } from "../../component";
import { Link, useNavigate } from "react-router-dom";
import { useHomeUtils } from "./homeUtils";
import HomeBanner from "../../component/home/HomeBanner";
import SpecialGifts from "../../component/home/SpecialGifts";
import FeaturedProducts from "../../component/home/FeaturedProducts";
import DeliveryBanner from "../../component/home/DeliveryBanner";
import CakeGiftShowcase from "../../component/home/CakeGiftShowcase";
import ClientTestimonials from "../../component/home/ClientTestimonials";
import BlogSection from "../../component/home/BlogSection";
import WhyChooseUs from "../../component/home/WhyChooseUs";
import ProductListings from "../../component/home/ProductListings";
import SEO from "../../component/SEO/SEO";

const Home = () => {
  const { sectionData, loading, loadingStates, data } = useHomeUtils();
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title={data.meta_title}
        description={data.meta_description}
        keywords={data.meta_keywords}
      />
      {/* home banner section */}
      <HomeBanner data={sectionData["banner"]} loading={loading} />

      {/* surprise celeration */}
      <SpecialGifts
        data={data}
        loading={loading}
        sectionData={sectionData["celebration_categories"]}
      />

      {/* special gift section */}
      <section className="special-gift-wrapper">
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
                {!loadingStates["special_occasion_products"] &&
                (!sectionData["special_occasion_products"] ||
                  sectionData["special_occasion_products"].length == 0) ? (
                  ""
                ) : (
                  <>
                    <h3 data-aos="fade-up" data-aos-delay="50">
                      <span>{data?.special_text}</span>{" "}
                      {data?.occasion_gifts_text}
                    </h3>
                    <p data-aos="fade-up" data-aos-delay="60">
                      {data?.occasion_wise_gift_sub_text}
                    </p>
                  </>
                )}
                <Link to="/products">View All</Link>
              </>
            )}
          </div>

          <GiftCardGrid
            cards={sectionData["special_occasion_products"] || []}
            loading={loadingStates["special_occasion_products"]}
          />
        </div>
        <img
          className="shape-right"
          data-aos="fade-left"
          data-aos-delay="90"
          src={image["shape-2.png"]}
          alt="shape"
        />
      </section>

      {/* our featured products */}
      <FeaturedProducts
        data={data}
        loading={loadingStates["our_featured_products"]}
        sectionData={sectionData["our_featured_products"] || []}
      />

      {/* delivery banner  */}
      <DeliveryBanner data={data} loading={loading} />

      {/* latest - popular products */}
      <ProductListings
        data={data}
        loading={loading}
        sectionData={sectionData}
        loadingStates={loadingStates}
      />

      {/* mega gift collection */}
      <section className="mega-collection">
        <div className="center-content" data-aos="zoom-in-up">
          <h4>{data?.mega_gift_collection_text}</h4>
          <h3>{data?.get_upto_text}</h3>
          <button className="order-btn" onClick={() => navigate("/products")}>
            Order Now
          </button>
        </div>
      </section>

      {/* cake and gift section */}
      <CakeGiftShowcase
        data={data}
        loading={loading}
        sectionData={sectionData}
        loadingStates={loadingStates}
      />
      {/* our client says */}
      <ClientTestimonials
        data={data}
        loading={loading}
        sectionData={sectionData}
        loadingStates={loadingStates}
      />

      {/* combo gift section */}
      <section className="surprise-celebration-wrapper">
        <div className="container">
          <div className="common-heading">
            <h3 data-aos="fade-up">
              <span>{data?.combo_text}</span> {data?.gifts_for_every_one_text}
            </h3>
          </div>

          {loadingStates?.["combo_gifts_categories"] ||
          !sectionData?.["combo_gifts_categories"]?.length ? (
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
                  <div className="common-cele-cards">
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
            <CelebrationCards
              cards={sectionData["combo_gifts_categories"]}
              loadingStates={loadingStates}
            />
          )}
        </div>
      </section>
      {/* blog section wrapper */}
      <BlogSection
        data={data}
        loading={loading}
        sectionData={sectionData}
        loadingStates={loadingStates}
      />
      {/* why chooose us section */}
      <WhyChooseUs data={data} loading={loading} />
    </>
  );
};

export default Home;
