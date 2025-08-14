import { Skeleton, Carousel } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WhiteShape } from "../../icon/icons";

const HomeBanner = ({ loading, data }) => {

  return (
    <section className="home-banner" >
      {loading && !data?.length ? (
        <Skeleton.Image
          active
          style={{
            width: "100%",
            height: "80vh",
            minHeight: 500,
            borderRadius: 0,
          }}
        />
      ) : (
        <>
          <Carousel arrows infinite={true} autoplay>
            {data?.map((banner, index) => (
              <div key={index} className="slides">
                <img
                  src={banner.image}
                  alt={banner.title}
                  loading="lazy"
                  style={{ width: "100%", height: "auto" }}
                  className={`image`}
                 
                />
                <Link to={"/products"} className="order-btn">
                  Order Now
                </Link>
              </div>
            ))}
          </Carousel>
          <div className="bottom-shape">
            <WhiteShape />
          </div>
        </>
      )}
    </section>
  );
};

export default HomeBanner;
