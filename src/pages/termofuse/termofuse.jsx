import React from "react";
import "./termofuse.scss";
import { Breadcrumbs } from "./../../component";
import { HomeOutlined } from "@ant-design/icons";
import { useTermsOfUseUtils } from "./useTermsOfUseUtils";
import { Skeleton } from "antd";
import SEO from "../../component/SEO/SEO";
const termofuse = () => {
  const { termsData, loading } = useTermsOfUseUtils();
  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Terms of Use", href: "/terms-of-use", active: true },
  ];

  return (
    <>
      <SEO
        title={termsData?.meta_title}
        description={termsData?.meta_description}
        keywords={termsData?.meta_keywords}
      />
      <div className="term-condition-wrapper">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="container">
          {loading ? (
            <>
              <Skeleton active paragraph={{ rows: 4 }} />
              <Skeleton active paragraph={{ rows: 6 }} />
              <Skeleton active paragraph={{ rows: 5 }} />
            </>
          ) : termsData ? (
            <>
              <div className="heading">
                <span></span>
                <p>{termsData.testimonials_title}</p>
                <span></span>
              </div>
              <div className="content-wrap">
                <div
                  dangerouslySetInnerHTML={{
                    __html: termsData.testimonials_text,
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

export default termofuse;
