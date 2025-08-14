import React, { useState } from "react";
import "./product.scss";
import { Breadcrumbs, Filters, Productcard } from "../../component";
import { Col, Row, Form, Select, Input, Pagination, Skeleton } from "antd";

import { Filter } from "../../icon/icons";
import { HomeOutlined } from "@ant-design/icons";
import { ProductUtils } from "./ProductUtils";

import { ProductSkeleton } from "../../component/ProductSkeleton/ProductSkeleton";
import Empty_cart from "../../component/empty_cart";
import SEO from "../../component/SEO/SEO";
import { usePageSEO } from "../../hooks/usePageSEO/usePageSEO";

const products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    products,
    filters,
    loading,
    pagination,
    handleSearch,
    handleSortChange,
    handlePaginationChange,
    handleFilterChange,
    selectedFilters,
    handleSearchChange,
    searchText,
    categoryBanner,
    loadingBanner,
  } = ProductUtils();

  const toggleFilter = () => setIsOpen(!isOpen);
  const { Search } = Input;

  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Cakes", href: "/products", active: true },
  ];

  return (
    <>
      <SEO
        title={categoryBanner?.meta_title}
        description={categoryBanner?.meta_description}
        keywords={categoryBanner?.meta_keywords}
      />

      <div className="products-wrapper">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="container">
          <div className="top-banner">
            {loadingBanner ? (
              <Skeleton.Image
                active
                style={{
                  width: "100%",
                  height: 300,
                  borderRadius: 8,
                }}
              />
            ) : (
              <img
                src={categoryBanner?.banner}
                alt="banner"
                loading="eager"
                style={{
                  opacity: loadingBanner ? 0 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
            )}
          </div>
        </div>
        <div className="product-container">
          <div className="container">
            <Row gutter={24}>
              {/* <Col xs={0} sm={0} md={6} lg={6} xl={6} className="hide-filter">
              <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                selectedFilters={selectedFilters}
              />
            </Col> */}
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="product-listing-wrap">
                  <div className="heading-title">
                    <Search
                      placeholder="Search for anything..."
                      className="search-wrapper"
                      value={searchText}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onSearch={handleSearch}
                      allowClear
                    />

                    <p>
                      Showing {products.length} of {pagination.total} Results
                    </p>
                    <Form.Item label="Sort by:">
                      <Select defaultValue="latest" onChange={handleSortChange}>
                        <Select.Option value="latest">Latest</Select.Option>
                        <Select.Option value="is_popular">
                          Popular
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <button onClick={toggleFilter} className="filter-btn">
                      <Filter />
                    </button>
                  </div>

                  <>
                    <Row gutter={24}>
                      {loading ? (
                        [...Array(4)].map((_, index) => (
                          <ProductSkeleton key={`skeleton-${index}`} />
                        ))
                      ) : (
                        <>
                          {products.length > 0 ? (
                            <>
                              {products.map((product, index) => (
                                <Col
                                  // key={`${product.id}-${index}`}
                                  key={`product-${product.id}-${product.slug} - ${index}`}
                                  xs={24}
                                  sm={12}
                                  md={12}
                                  lg={6}
                                  xl={6}
                                >
                                  <Productcard product={product} />
                                </Col>
                              ))}
                            </>
                          ) : (
                            <Empty_cart type="product" />
                          )}
                        </>
                      )}
                    </Row>

                    {!loading && pagination.total > pagination.pageSize && (
                      <Pagination
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={handlePaginationChange}
                        showSizeChanger={false}
                      />
                    )}
                  </>
                </div>
              </Col>
            </Row>
            <div className={`filter-phone ${isOpen ? "active" : ""}`}>
              <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                selectedFilters={selectedFilters}
              />
            </div>
            {isOpen && (
              <div className="nav-backdrop" onClick={toggleFilter}></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default products;
