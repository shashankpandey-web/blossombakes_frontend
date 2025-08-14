import React from "react";
import "./wishlist.scss";
import { Breadcrumbs } from "../../component";
import { HomeOutlined } from "@ant-design/icons";
import image from "../../utils/helpers";
import { Cross } from "../../icon/icons";
import { useWishlistUtils } from "./wishlistUtils";
import Empty_cart from "../../component/empty_cart";
import { Skeleton, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../component/SEO/SEO";
import { usePageSEO } from "../../hooks/usePageSEO/usePageSEO";

const Wishlist = () => {
  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "My Wishlist", href: "/wishlist", active: true },
  ];

  const { wishlist_list, loading, handleRemoveItem } = useWishlistUtils();
  const navigate = useNavigate();

  const renderPrice = (item) => {
    const hasDiscount =
      item.discount_price && item.discount_price < item.regular_price;

    return (
      <div className="price-container">
        {hasDiscount ? (
          <>
            <span className="discount-price">₹{item.discount_price}</span>
            <span className="regular-price struck">₹{item.regular_price}</span>
          </>
        ) : (
          <span className="regular-price">₹{item.regular_price}</span>
        )}
      </div>
    );
  };

  // Skeleton table configuration
  const skeletonColumns = [
    {
      title: "Product",
      key: "product",
      render: () => (
        <div className="product-details">
          <Skeleton.Image active style={{ width: 80, height: 80 }} />
          <Skeleton.Input active size="small" style={{ width: 150 }} />
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: () => (
        <Skeleton.Input active size="small" style={{ width: 100 }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="button-group">
          <Skeleton.Button active size="small" style={{ width: 100 }} />
          <Skeleton.Button active size="small" style={{ width: 32 }} />
        </div>
      ),
    },
  ];

  const skeletonData = Array(3).fill({});


  const { seoData } = usePageSEO("wishlist");
  
  return (
    <>
     <SEO
        title={seoData?.meta_title}
        description={seoData?.meta_description}
        keywords={seoData?.meta_keywords}
      />
    <div className="wishlist-wrapper">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container">
        {false ? (
          <div className="table-main">
            <Table
              columns={skeletonColumns}
              dataSource={skeletonData}
              pagination={false}
              showHeader={false}
            />
          </div>
        ) : wishlist_list?.length > 0 ? (
          <div className="table-main">
            <table>
              <thead>
                <tr>
                  <th>Product({wishlist_list.length})</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlist_list.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="product-details">
                        <Link to={`/productdetail/${item.slug}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                              e.target.src = image["product-placeholder.png"];
                            }}
                          />
                        </Link>
                        <h3>{item.name}</h3>
                      </div>
                    </td>
                    <td>{renderPrice(item)}</td>
                    <td>
                      <div className="button-group">
                        <button
                          className="add-cart-btn"
                          onClick={() =>
                            navigate(`/productdetail/${item.slug}`)
                          }
                        >
                          Add to Cart
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleRemoveItem(item.slug)}
                        >
                          <Cross />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty_cart type="wishlist" />
        )}
      </div>
    </div>
    </>
  );
};

export default Wishlist;
