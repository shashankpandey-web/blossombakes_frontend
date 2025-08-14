import React from "react";
import "./termcondition.scss";
import { Breadcrumbs } from "../../component";
import { HomeOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { useTermConditionUtils } from "./useTermConditionUtils";
import SEO from "../../component/SEO/SEO";

const TermCondition = () => {
  const { termData, loading } = useTermConditionUtils();

  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Terms and conditions", href: "/term-condition", active: true },
  ];

  return (
    <>

      <SEO
        title={termData?.meta_title}
        description={termData?.meta_description}
        keywords={termData?.meta_keywords}
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
        ) : termData ? (
          <>
            <div className="heading">
              <span></span>
              <p>{termData.termscondition_title}</p>
              <span></span>
            </div>
            <div className="content-wrap">
              <div
                dangerouslySetInnerHTML={{
                  __html: termData.termscondition_text,
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

export default TermCondition;
