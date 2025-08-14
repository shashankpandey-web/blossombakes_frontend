import React from "react";
import "./contactus.scss";
import { HomeOutlined } from "@ant-design/icons";
import { Col, Row, Form, Input, Button, Skeleton, message } from "antd";
import { Breadcrumbs } from "../../component";
import { Link } from "react-router-dom";
import { Facebook, Twiteer, LinkedIn, Instagram } from "../../icon/icons";
import { useContactUtils } from "./useContactUtils";
import Loading from "../../component/Loader/Loading";
import { useSelector } from "react-redux";
import SEO from "../../component/SEO/SEO";

const ContactUs = () => {
  const { contactData, loading, form, handleSubmit, contactloading } =
    useContactUtils();
  const { setting } = useSelector((state) => state.setting);
  const breadcrumbItems = [
    { label: <HomeOutlined fill="#6D6D6D" />, href: "/" },
    { label: "Contact Us", href: "/contactus", active: true },
  ];

  console.log("setting", setting);

  return (
    <>
      <SEO
        title={contactData?.meta_title}
        description={contactData?.meta_description}
        keywords={contactData?.meta_keywords}
      />

      <div className="contact_us_page">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="container">
          {loading ? (
            <>
              <Skeleton active paragraph={{ rows: 2 }} />
              <Skeleton active paragraph={{ rows: 8 }} />
            </>
          ) : contactData ? (
            <>
              <div className="headings">
                <h2>{contactData.contactus_title}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: contactData.contactus_text,
                  }}
                />
              </div>

              <div className="contact_info">
                <Row>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <div className="personal_info">
                      <div className="all_info">
                        <h2>{contactData.get_in_touch}</h2>
                        <div className="p_info">
                          <div className="icons">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <path
                                opacity="0.2"
                                d="M28.0007 7L16.0007 18L4.00073 7H28.0007Z"
                                fill="white"
                              />
                              <path
                                d="M28 7L16 18L4 7"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M4 7H28V24C28 24.2652 27.8946 24.5196 27.7071 24.7071C27.5196 24.8946 27.2652 25 27 25H5C4.73478 25 4.48043 24.8946 4.29289 24.7071C4.10536 24.5196 4 24.2652 4 24V7Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M13.8182 16L4.30835 24.7174"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M27.6919 24.7175L18.1819 16"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="emails">
                            <span>Email Address</span>
                            <h4>{setting?.footer_email_4}</h4>
                          </div>
                        </div>
                        <div className="p_info">
                          <div className="icons">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <path
                                opacity="0.2"
                                d="M11.5595 15.6018C12.5968 17.7225 14.3158 19.4336 16.4412 20.4613C16.5967 20.535 16.7687 20.5669 16.9403 20.5539C17.1119 20.5409 17.2771 20.4835 17.4198 20.3872L20.5492 18.3004C20.6877 18.2082 20.8469 18.1518 21.0126 18.1366C21.1782 18.1214 21.3451 18.1478 21.498 18.2133L27.3526 20.7224C27.5515 20.8069 27.7175 20.9537 27.8257 21.1408C27.9339 21.3278 27.9783 21.545 27.9524 21.7595C27.7673 23.2075 27.0608 24.5384 25.9652 25.503C24.8695 26.4676 23.4598 26.9998 22 26.9999C17.4913 26.9999 13.1673 25.2088 9.97919 22.0207C6.79107 18.8326 5 14.5086 5 9.99988C5.00008 8.5401 5.53224 7.13039 6.49685 6.03472C7.46146 4.93905 8.79237 4.23255 10.2404 4.0475C10.4549 4.02154 10.672 4.066 10.8591 4.17418C11.0461 4.28236 11.193 4.4484 11.2775 4.64728L13.7888 10.507C13.8537 10.6586 13.8802 10.8239 13.8658 10.9881C13.8514 11.1524 13.7967 11.3106 13.7064 11.4485L11.6268 14.626C11.5322 14.769 11.4762 14.934 11.4644 15.105C11.4526 15.2761 11.4854 15.4472 11.5595 15.6018Z"
                                fill="white"
                              />
                              <path
                                d="M11.5595 15.6018C12.5968 17.7225 14.3158 19.4336 16.4412 20.4613C16.5967 20.535 16.7687 20.5669 16.9403 20.5539C17.1119 20.5409 17.2771 20.4835 17.4198 20.3872L20.5492 18.3004C20.6877 18.2082 20.8469 18.1518 21.0126 18.1366C21.1782 18.1214 21.3451 18.1478 21.498 18.2133L27.3526 20.7224C27.5515 20.8069 27.7175 20.9537 27.8257 21.1408C27.9339 21.3278 27.9783 21.545 27.9524 21.7595C27.7673 23.2075 27.0608 24.5384 25.9652 25.503C24.8695 26.4676 23.4598 26.9998 22 26.9999C17.4913 26.9999 13.1673 25.2088 9.97919 22.0207C6.79107 18.8326 5 14.5086 5 9.99988C5.00008 8.5401 5.53224 7.13039 6.49685 6.03472C7.46146 4.93905 8.79237 4.23255 10.2404 4.0475C10.4549 4.02154 10.672 4.066 10.8591 4.17418C11.0461 4.28236 11.193 4.4484 11.2775 4.64728L13.7888 10.507C13.8537 10.6586 13.8802 10.8239 13.8658 10.9881C13.8514 11.1524 13.7967 11.3106 13.7064 11.4485L11.6268 14.626C11.5322 14.769 11.4762 14.934 11.4644 15.105C11.4526 15.2761 11.4854 15.4472 11.5595 15.6018V15.6018Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M19.9272 5C21.6225 5.45592 23.1682 6.34928 24.4095 7.59059C25.6508 8.8319 26.5441 10.3776 27.0001 12.0728"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M18.8916 8.86475C19.9087 9.1383 20.8362 9.67431 21.5809 10.4191C22.3257 11.1639 22.8617 12.0913 23.1353 13.1084"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="emails">
                            <span>Contact Number</span>
                            <h4>{setting?.footer_phone_4}</h4>
                          </div>
                        </div>
                        <div className="p_info">
                          <div className="icons">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                              >
                                <path
                                  opacity="0.2"
                                  d="M16 3C13.3478 3.00001 10.8043 4.05358 8.92894 5.92894C7.05358 7.8043 6.00001 10.3478 6 13C6 22 16 29 16 29C16 29 26 22 26 13C26 10.3478 24.9464 7.8043 23.0711 5.92894C21.1957 4.05358 18.6522 3.00001 16 3ZM16 17C15.2089 17 14.4355 16.7654 13.7777 16.3259C13.1199 15.8864 12.6072 15.2616 12.3045 14.5307C12.0017 13.7998 11.9225 12.9956 12.0769 12.2196C12.2312 11.4437 12.6122 10.731 13.1716 10.1716C13.731 9.61216 14.4437 9.2312 15.2196 9.07686C15.9956 8.92252 16.7998 9.00173 17.5307 9.30448C18.2616 9.60723 18.8864 10.1199 19.3259 10.7777C19.7654 11.4355 20 12.2089 20 13C20 14.0609 19.5786 15.0783 18.8284 15.8284C18.0783 16.5786 17.0609 17 16 17Z"
                                  fill="white"
                                />
                                <path
                                  d="M7 29H25"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z"
                                  stroke="white"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </svg>
                          </div>
                          <div className="emails">
                            <span>Address</span>
                            <h4>{setting?.footer_address_4}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="bottom-social-media">
                        <div className="heading">
                          <h2>{contactData.contact_us_via}</h2>
                        </div>
                        <ul>
                          <li>
                            <a
                              href={setting?.facebook_link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Facebook />
                            </a>
                          </li>
                          <li>
                            <a
                              href={setting?.twitter_link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Twiteer />
                            </a>
                          </li>
                          <li>
                            <a
                              href={setting?.linkedin_link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LinkedIn />
                            </a>
                          </li>
                          <li>
                            <a
                              href={setting?.instagram_link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Instagram />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                    <div className="contact-form">
                      <Loading isLoading={contactloading}>
                        <Form
                          form={form}
                          layout="vertical"
                          onFinish={handleSubmit}
                        >
                          <Row gutter={16}>
                            <Col xs={24} md={24} lg={12}>
                              <Form.Item
                                name="fullName"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your full name",
                                  },
                                ]}
                              >
                                <Input placeholder="Full name" />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={12}>
                              <Form.Item
                                name="mobile"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your mobile number",
                                  },
                                  {
                                    pattern: /^[0-9]{10}$/,
                                    message:
                                      "Please enter a valid 10-digit mobile number",
                                  },
                                ]}
                              >
                                <Input placeholder="Mobile number" />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Form.Item
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your email",
                              },
                              {
                                type: "email",
                                message: "Please enter a valid email",
                              },
                            ]}
                          >
                            <Input placeholder="Email" />
                          </Form.Item>

                          <Form.Item
                            name="description"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your message",
                              },
                            ]}
                          >
                            <Input.TextArea
                              rows={8}
                              placeholder="Description"
                            />
                          </Form.Item>

                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="Send-btn"
                            >
                              Send
                            </Button>
                          </Form.Item>
                        </Form>
                      </Loading>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
