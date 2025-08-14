import { Col, Row, Skeleton } from "antd";

import { Calendar, User } from "../../icon/icons";

import React from "react";

import { Link } from "react-router-dom";

const BlogSection = ({ loading, data , sectionData , loadingStates }) => {
   if (!loadingStates['blogs'] && (!sectionData['blogs'] || sectionData['blogs'].length == 0)) {
    return null;
  }



  return (
    <section className="blog-wrapper">
      <div className="container">
        <div className="common-heading">
          {loading ? (
            <div className="text__center">
              <Skeleton.Button
                active
                size="large"
                style={{ width: 300, height: 40, margin: "0 auto" }}
              />
            </div>
          ) : (
            <h3 data-aos="fade-up">
              {data?.our_latest_text} <span>{data?.news_blog_text}</span>
            </h3>
          )}
        </div>

        <Row gutter={24}>
          {loadingStates['blogs']
            ? // Show skeleton loaders while loading
              [1, 2, 3].map((item) => (
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
              ))
            : 
              (sectionData['blogs'] || []).map((blog, index) => (
                <Col key={blog.slug} xs={24} sm={12} md={12} lg={8} xl={8}>
                  <div className="common-blog-cards" data-aos="fade-up">
                    <img src={blog.image} alt={blog.title} />
                    <div className="user-info">
                      <p>
                        <User /> {blog.author_name}
                      </p>
                      <p>
                        <Calendar /> {blog.created_at_day}
                      </p>
                    </div>
                    <h3>{blog.title}</h3>
                    <p>{blog.short_description}</p>
                    <Link to={`/blog/${blog.slug}`} className="read-more-btn">
                      Read more
                    </Link>
                  </div>
                </Col>
              ))}
        </Row>
      </div>
    </section>
  );
};

export default BlogSection;
