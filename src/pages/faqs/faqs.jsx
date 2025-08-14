import React, { useState } from "react";
import "./faqs.scss";
import { Collapse, Skeleton } from "antd";
import { Breadcrumbs } from "../../component";
import { HomeOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useFaqUtils } from "./useFaqUtils";
import SEO from "../../component/SEO/SEO";

const Faqs = () => {
  const { Panel } = Collapse;
  const { faqData, loading } = useFaqUtils();
  const [activeKey, setActiveKey] = useState(null);

  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "FAQ", href: "/faqs", active: true },
  ];

  return (
    <>
      <SEO
        title={faqData?.meta_title}
        description={faqData?.meta_description}
        keywords={faqData?.meta_keywords}
      />

      <div className="faqs-wrapper">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="container">
          {loading ? (
            <>
              <Skeleton active paragraph={{ rows: 4 }} />
              <Skeleton active paragraph={{ rows: 4 }} />
              <Skeleton active paragraph={{ rows: 4 }} />
            </>
          ) : faqData ? (
            <>
              <div className="heading">
                <span></span>
                <p>{faqData.faq_title}</p>
                <span></span>
              </div>
              <div className="content-wrap">
                <Collapse
                  accordion
                  activeKey={activeKey}
                  onChange={(key) => setActiveKey(key)}
                  expandIcon={({ isActive }) =>
                    isActive ? (
                      <MinusOutlined style={{ fontSize: 16 }} />
                    ) : (
                      <PlusOutlined style={{ fontSize: 16 }} />
                    )
                  }
                  expandIconPosition="end"
                  className="faq-collapse"
                >
                  {faqData.faqs.map((faq, index) => (
                    <Panel header={faq.title} key={index.toString()}>
                      <p>{faq.description}</p>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Faqs;
