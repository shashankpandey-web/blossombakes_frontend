import React, { useState, useEffect } from "react";
import { Menu, Row, Col, Drawer, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./megamenu.scss";
import { Hamburger, MenuSearch } from "../../../icon/icons";
import { useSelector } from "react-redux";

const MegaMenu = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const { setting, loading } = useSelector((state) => state.setting);
  const [menuData, setMenuData] = useState([]);
  const navigate = useNavigate();
  // Process menu data when setting changes
  useEffect(() => {
    if (setting?.menu) {
      setMenuData(setting.menu);
    }
  }, [setting]);

  // Detect resize to toggle mobile mode
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recursive function to render menu items
  const renderMenuItems = (items, isRoot = false) => {
    return items.map((item) => {
      if (item.child && item.child.length > 0) {
        return (
          <Menu.SubMenu
            key={item.slug}
            title={
              <span>
                {item.title} {isMobile ? null : <DownOutlined />}
              </span>
            }
            popupClassName={!isMobile && isRoot ? "mega-dropdown" : ""}
          >
            {isRoot ? (
              <div className="mega-menu-content">
                <Row gutter={30}>
                  {item.child.map((child, index) => {
                    const hasChildren = child.child && child.child.length > 0;
                    return (
                      <Col key={index} xs={24} sm={12} md={6}>
                        <h4
                          onClick={() => {
                            if (!hasChildren) {
                              navigate(`/category/${child.slug}`);
                            }
                            setVisible(false);
                          }}
                          style={!hasChildren ? { cursor: "pointer" } : {}}
                        >
                          {child.title}
                        </h4>
                        <ul>
                          {child.child && child.child.length > 0
                            ? child.child.map((subChild, subIndex) => (
                                <li key={subIndex}>
                                  <Link
                                    to={`/category/${subChild.slug}`}
                                    onClick={() => setVisible(false)}
                                  >
                                    {subChild.title}
                                  </Link>
                                </li>
                              ))
                            : ""}
                        </ul>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            ) : (
              <Menu>
                {item.child.map((child) => (
                  <Menu.Item key={child.slug}>
                    <Link
                      to={`/category/${child.slug}`}
                      onClick={() => setVisible(false)}
                    >
                      {child.title}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            )}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.slug}>
          <Link to={`/category/${item.slug}`} onClick={() => setVisible(false)}>
            {item.title}
          </Link>
        </Menu.Item>
      );
    });
  };

  const menuContent = (
    <Menu mode={isMobile ? "inline" : "horizontal"} className="mega-menu">
      {loading ? (
        <Menu.Item key="loading"></Menu.Item>
      ) : (
        renderMenuItems(menuData, true)
      )}
    </Menu>
  );

  return (
    <div className="responsive-mega-menu">
      {isMobile ? (
        <>
          <Button
            type="text"
            onClick={() => setVisible(true)}
            className="hamburger-btn"
          >
            <MenuSearch />
          </Button>
          <Drawer
            title="Menu"
            placement="left"
            onClose={() => setVisible(false)}
            visible={visible}
            bodyStyle={{ padding: 0 }}
          >
            {menuContent}
          </Drawer>
        </>
      ) : (
        menuContent
      )}
    </div>
  );
};

export default MegaMenu;
