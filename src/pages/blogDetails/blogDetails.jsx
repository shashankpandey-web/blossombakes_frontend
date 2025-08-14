import React from "react";
import "./blogDetails.scss";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumbs } from "./../../component";
import image from "../../utils/helpers";
import { Calendar, User } from "../../icon/icons";
import { useBlogDetailsUtils } from "./useBlogDetailsUtils";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import SEO from "../../component/SEO/SEO";

const BlogDetails = () => {
  const { blog, loading } = useBlogDetailsUtils();

  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Blogs", href: "/blogs" },
    {
      label: loading ? "Loading..." : blog?.title || "Blog Details",
      href: "#",
      active: true,
    },
  ];

  return (
    <>
    
      <SEO
        title={blog?.title}
        description={blog?.short_description}
        keywords={blog?.meta_keywords}
      />

    <div className="blog-details-wrapper">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="container">
        {loading ? (
          <div className="content-wrap">
            <Skeleton.Image active className="blog-image-skeleton" />
            <div className="blog-date">
              <Skeleton active paragraph={{ rows: 0 }} />
            </div>
            <div className="blog-content">
              <Skeleton active paragraph={{ rows: 6 }} />
            </div>

            
          </div>
        ) : blog ? (
          <div className="content-wrap">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="blog-featured-image"
            />
            <div className="blog-date">
              <p>
                <User /> {blog?.author_name}
              </p>
              <p>
                <Calendar /> {blog?.created_at_day}
              </p>
            </div>
            <div className="blog-content">
              <h3>{blog?.title}</h3>
              <h4>{blog?.short_description}</h4>
              <div
                dangerouslySetInnerHTML={{ __html: blog?.description }}
                className="blog-html-content"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
    </>
  );
};

export default BlogDetails;
