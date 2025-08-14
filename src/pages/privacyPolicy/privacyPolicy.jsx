import React from "react";
import "./privacyPolicy.scss";
import { Breadcrumbs } from "../../component";
import { HomeOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { usePrivacyPolicyUtils } from "./usePrivacyPolicyUtils";
import SEO from "../../component/SEO/SEO";

const PrivacyPolicy = () => {
  const { privacyData, loading } = usePrivacyPolicyUtils();

  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Privacy Policy", href: "/privacy-policy", active: true },
  ];

  return (
    <>
      <SEO
        title={privacyData?.meta_title}
        description={privacyData?.meta_description}
        keywords={privacyData?.meta_keywords}
      />

      <div className="privacy-policy-wrapper">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="container">
          {loading ? (
            <>
              <Skeleton active paragraph={{ rows: 4 }} />
              <Skeleton active paragraph={{ rows: 6 }} />
              <Skeleton active paragraph={{ rows: 5 }} />
            </>
          ) : privacyData ? (
            <>
              <div className="heading">
                <span></span>
                <p>{privacyData.privacypolicy_title}</p>
                <span></span>
              </div>
              <div className="content-wrap">
                {/* Dynamic content from API */}
                <div className="common-points">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: privacyData.privacypolicy_text,
                    }}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
