import React from "react";
import "./disclaimer.scss";
import { Breadcrumbs } from "../../component";
import { HomeOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { useDisclaimerUtils } from "./useDisclaimerUtils";
import SEO from "../../component/SEO/SEO";

const Disclaimer = () => {
  const { disclaimerData, loading } = useDisclaimerUtils();

  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Disclaimer", href: "/disclaimer", active: true },
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
                <p>{disclaimerData.disclaimer_title}</p>
                <span></span>
              </div>
              <div className="content-wrap">
                <div
                  dangerouslySetInnerHTML={{
                    __html: disclaimerData.disclaimer_text,
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

export default Disclaimer;
