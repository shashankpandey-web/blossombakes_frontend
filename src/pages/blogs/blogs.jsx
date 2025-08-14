import React from "react";
import "./blogs.scss";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumbs } from "./../../component";
import { Select, Row, Col, Pagination, Skeleton } from "antd";
import image from "../../utils/helpers";
import { Link } from "react-router-dom";
import { RightArrow } from "../../icon/icons";
import { useBlogsUtils } from "./blogsUtils";
import Empty_cart from "../../component/empty_cart";
import SEO from "../../component/SEO/SEO";
import { usePageSEO } from "../../hooks/usePageSEO/usePageSEO";

const Blogs = () => {
  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Blogs", href: "/blogs", active: true },
  ];

  const { seoData } = usePageSEO("blogs");

  const {
    blogs,
    loading,
    error,
    sortBy,
    pagination,
    handleSortChange,
    handlePaginationChange,
  } = useBlogsUtils();

  return (
    <>
      <SEO
        title={seoData?.meta_title}
        description={seoData?.meta_description}
        keywords={seoData?.meta_keywords}
      />

      <div className="blog-listing-wrapper">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="container">
          <div className="filter-header">
            <div className="left-counting">
              <h3>
                {pagination.total} <span>Results Found</span>
              </h3>
            </div>
            <div className="sort-by-wrap">
              <p>Sort by:</p>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                options={[
                  { value: "latest", label: "Latest" },
                  { value: "popular", label: "Popular" },
                ]}
              />
            </div>
          </div>

          {loading ? (
            <Row gutter={24}>
              {[...Array(9)].map((_, index) => (
                <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
                  <div className="blogs-cards">
                    <Skeleton.Image active className="blog-image-skeleton" />
                    <div className="content">
                      <Skeleton active paragraph={{ rows: 2 }} />
                      <Skeleton.Button active size="small" />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              {blogs.length > 0 ? (
                <>
                  <Row gutter={24}>
                    {blogs.map((blog) => (
                      <Col
                        key={blog.slug}
                        xs={24}
                        sm={12}
                        md={12}
                        lg={8}
                        xl={6}
                      >
                        <div className="blogs-cards">
                          <div className="image-wrap">
                            <img src={blog.image} alt={blog.title} />
                            <div className="current-date">
                              <h4>{blog.created_at_day}</h4>
                              <p>{blog.created_at_month}</p>
                            </div>
                          </div>
                          <div className="content">
                            <h3>{blog.title}</h3>
                            <Link to={`/blog/${blog.slug}`}>
                              Read More <RightArrow />
                            </Link>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  {pagination.total > pagination.pageSize && (
                    <Pagination
                      current={pagination.current}
                      pageSize={pagination.pageSize}
                      total={pagination.total}
                      onChange={handlePaginationChange}
                      showSizeChanger={false}
                    />
                  )}
                </>
              ) : (
                <div className="empty-state">
                  <Empty_cart type="blog" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogs;
