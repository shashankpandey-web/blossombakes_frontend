import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { Call, Email, Location, Logo } from "../../../icon/icons";
import { Row, Col, Input } from "antd";
import image from "../../../utils/helpers";
import { useSelector } from "react-redux";
import footerUtils from "./footerUtils";

const footer = () => {
  const { setting } = useSelector((state) => state.setting);
  const { handleSubscribe, email, setEmail, handleKeyPress, loading } =
    footerUtils();


  return (
    <>
      <div className="footer-wrap">
        <div className="container">
          <div className="top-logo-header">
            <Logo />
            <div className="news-letter">
              <h3>Subscribe to Newsletter</h3>
              <p>Get updates on promotions and offers coupons.</p>
            </div>
            <div className="subscribe-wrapper">
              <Input
                placeholder="Your email address"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                                value={email}

              />
              <button
                className="subscribe-btn"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
          <Row gutter={24}>
            <Col xs={12} sm={12} md={12} lg={8} xl={8}>
              <div className="common-links">
                <h3>Policy Info</h3>
                <ul>
                  <li>
                    <Link to={"/term-condition"}>Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to={"/privacy-policy"}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to={"/terms-of-use"}>Terms of Use</Link>
                  </li>
                  <li>
                    <Link to={"/disclaimer"}>Disclaimer</Link>
                  </li>
                  <li>
                    <Link to={"/cancellation-return-refund-policy"}>Cancellation, Return & Refund Policy</Link>
                  </li>
                  <li>
                    <Link to={"/shipping-policy"}>Shipping policy</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={8} xl={8}>
              <div className="common-links">
                <h3>About Company</h3>
                <ul>
                  <li>
                    <Link to={"/about"}>About Us</Link>
                  </li>
                  <li>
                    <Link to={"/blogs"}>Blogs</Link>
                  </li>
                  <li>
                    <Link to={"/contactus"}>Contact Us</Link>
                  </li>
                  <li>
                    <Link to={"/faqs"}>FAQs</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <div className="common-links">
                <h3>Connect Us</h3>
                <div className="social-media-wrap">
                  <Call />
                  <div className="content">
                    <p>{setting?.footer_phone_4_text}</p>
                    <h3>{setting?.footer_phone_4}</h3>
                  </div>
                </div>
                <div className="social-media-wrap">
                  <Email />
                  <div className="content">
                    <p>Send Email</p>
                    <h3>{setting?.footer_email_4}</h3>
                  </div>
                </div>
                <div className="social-media-wrap">
                  <Location />
                  <div className="content">
                    <p> {setting?.footer_address_text}</p>
                    <h3>{setting?.footer_address_4}</h3>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="social-media-icon">
            <a
              href={setting?.facebook_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image["facebook.png"]} alt="Facebook icon" />
            </a>

            <a
              href={setting?.twitter_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image["twitter.png"]} alt="Twitter icon" />
            </a>

            <a
              href={setting?.linkedin_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image["linkedin.png"]} alt="LinkedIn icon" />
            </a>

            <a
              href={setting?.instagram_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={image["instagram.png"]} alt="Instagram icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="main-content">
            <p>{setting?.footer_copyright_text}</p>
            <ul>
              <li>
                  <img src={image["cards_image.png"]} alt="" />
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default footer;
