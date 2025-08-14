import { Skeleton } from 'antd'
import React from 'react'
import GiftCardGrid from './gift_card/GiftCardGrid'
import image from '../../utils/helpers'


const FeaturedProducts = ({data , loading ,sectionData}) => {

   if (!loading && (!sectionData || sectionData.length == 0)) {
    return null;
  }

  return (
      <section className="our-featured-wrapper">
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
                <h3 data-aos="fade-up" data-aos-delay="50">
                  <span>{data?.our_featured_text}</span>{" "}
                  {data?.occasion_products_text}
                </h3>
                <p data-aos="fade-up" data-aos-delay="50">
                  {data?.our_featured_sub_text}
                </p>
              </>
            )}
          </div>
          {/* <GiftCardGrid cards={productData} /> */}

          <GiftCardGrid
            cards={sectionData || []}
            loading={loading}
          />
        </div>
        <img
          data-aos="fade-right"
          data-aos-delay="80"
          className="shape-left"
          src={image["shape-3.png"]}
          alt="shape"
        />
        <img
          data-aos="fade-left"
          data-aos-delay="80"
          className="shape-right"
          src={image["shape-1.png"]}
          alt="shape"
        />
      </section>
  )
}

export default FeaturedProducts