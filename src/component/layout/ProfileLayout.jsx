import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Hamburger } from "../../icon/icons";
import { Breadcrumbs, ProfileNavbar } from './../../component';
import { Row, Col } from "antd";
import { HomeOutlined } from '@ant-design/icons';
const ProfileLayout = () => {
  const breadcrumbItems = [
    { label: <HomeOutlined fill='#6D6D6D' />, href: '/' },
    { label: 'My Account', href: '/profile/account', active: true },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleTabs = () => {
    setIsOpen(!isOpen);
  };

  const toggleOnMobile = () => {
    if (window.innerWidth < 768) {
      toggleTabs();
    }
  };

  return (
    <>
      <div className="profile-wrapper">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="container">
          <div className="toggle-tabs">
            <button onClick={toggleTabs} className="hamburger">
              <Hamburger />
            </button>
          </div>

          <div className="profile-container">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <ProfileNavbar isOpen={isOpen} toggleOnMobile={toggleOnMobile} />
              </Col>

              <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                <Outlet />
              </Col>
            </Row>
          </div>

          {isOpen && (
            <div className="nav-backdrop" onClick={toggleTabs}></div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
