import React from "react";
import "./ShippingPolicy.scss";
import { Breadcrumbs } from "../../component";
import { HomeOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { useShippingPolicyUtils } from "./useShippingPolicyUtils";
import SEO from "../../component/SEO/SEO";

const ShippingPolicy = () => {
  const { disclaimerData, loading } = useShippingPolicyUtils();

  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Shipping policy", href: "/shipping-policy", active: true },
  ];

  return (
    <>
      <SEO
        title={disclaimerData?.meta_title}
        description={disclaimerData?.meta_description}
        keywords={disclaimerData?.meta_keywords}
      />

      <div className="disclaimer-wrapper">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="container">
          {loading ? (
            <>
              <Skeleton active paragraph={{ rows: 4 }} />
              <Skeleton active paragraph={{ rows: 6 }} />
            </>
          ) : disclaimerData ? (
            <>
              <div className="heading">
                <span></span>
                <p>{disclaimerData.testimonials_title}</p>
                <span></span>
              </div>
              <div className="content-wrap">
                <div
                  dangerouslySetInnerHTML={{
                    __html: disclaimerData.testimonials_text,
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
