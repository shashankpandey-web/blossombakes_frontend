import React, { useContext, useState, useEffect } from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  Cart,
  DownArrow,
  Hamburger,
  Heart,
  Location_red,
  Logo,
  Search,
  UserLarge,
} from "../../../icon/icons";
import { Select, Input, Button, Badge, Divider, Space, Menu } from "antd";
import Login from "./../../auth/login/login";
import Location from "./../location/location";
import MegaMenu from "./../megamenu/megamenu";
import { useSelector } from "react-redux";
import { MainContext } from "../../../context";
import { ShimmerText } from "react-shimmer-effects";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // const selectedCity = JSON.parse(
  //   localStorage.getItem("_blossom_selectedCity")
  // );
  // const { loginModal, setLoginModal, selectedCity, selectedPincode } = useContext(MainContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loginModal, setLoginModal , selectedCity , selectedPincode} = useContext(MainContext);
  const [locationModal, setLocationModal] = useState(false);
  const { isUserDetail, isUserLogin } = useSelector((state) => state.auth);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { SubMenu } = Menu;

  const { setting, loading } = useSelector((state) => state.setting);
  const wishlistCount = useSelector((state) => state.wishlist.wishlist_count);
  const cartCount = useSelector((state) => state.cart.cart_count);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.append("search", searchQuery.trim());
    }

    if (selectedCategory !== "all") {
      navigate(`/category/${selectedCategory}?${params.toString()}`);
    } else {
      navigate(`/products?${params.toString()}`);
    }

    setSearchQuery("");
    closeSidebar();
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (!selectedCity) {
      setLocationModal(true);
    }
  }, [selectedCity]);

  const search_categories = setting?.search_categories || [];

  return (
    <>
      <header>
        <div class="position-relative marquee-container d-none d-sm-block">
          {loading ? (
            <ShimmerText line={false} gap={10} />
          ) : (
            <>
              <div class="marquee d-flex justify-content-around">
                <span>{setting?.free_fast_shipping}</span>
                <Divider type="vertical" />
                <span>{setting?.late_night_delivery}</span>
                <Divider type="vertical" />
                <span>{setting?.satisfaction_guarantee}</span>
                <Divider type="vertical" />
                <span>{setting?.secure_checkout}</span>
                <Divider type="vertical" />
                <span>{setting?.dedicated_help_center}</span>
              </div>
              <div class="marquee marquee2 d-flex justify-content-around">
                <span>{setting?.free_fast_shipping}</span>
                <Divider type="vertical" />
                <span>{setting?.late_night_delivery}</span>
                <Divider type="vertical" />
                <span>{setting?.satisfaction_guarantee}</span>
                <Divider type="vertical" />
                <span>{setting?.secure_checkout}</span>
                <Divider type="vertical" />
                <span>{setting?.dedicated_help_center}</span>
              </div>
            </>
          )}
        </div>

        <div className={`header-fixed ${isSticky ? "fixed" : ""}`}>
          <div className="header-wrapper">
            <div className="container">
              <div className="header-container">
                <div className="logo-brand">
                  <button className="hamburger-btn" onClick={toggleSidebar}>
                    <Hamburger />
                  </button>
                  <Link to={"/"} className="bg-logo">
                    <Logo image={setting?.header_logo} />
                  </Link>
                </div>
                <div className="search-container">
                  <Space.Compact>
                    <Select
                      defaultValue="all"
                      className="category-select"
                      value={selectedCategory}
                      onChange={(value) => setSelectedCategory(value)}
                    >
                      <Select.Option value="all">All categories</Select.Option>
                      {search_categories.map((category) => (
                        <Select.Option
                          key={category.slug}
                          value={category.slug}
                        >
                          {category.title}
                        </Select.Option>
                      ))}
                    </Select>
                    <Input
                      name="seach"
                      placeholder="Search Product here..."
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />

                    <Button
                      type="primary"
                      icon={<Search />}
                      className="search-btn"
                      onClick={handleSearch}
                    />
                  </Space.Compact>
                </div>
                <div className="right-container">
                  {/* Location */}
                  <div className="header-icon-block">
                    <span className="icon">
                      <Location_red />
                    </span>
                    <div className="text">
                      <div className="label">
                        {selectedCity
                          ? selectedCity?.name
                          : "Where to deliver?"}{" "}
                      </div>
                      {/* <div className="label">Where to deliver?</div> */}
                      <Link
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setLocationModal(true);
                        }}
                        className="sub-label"
                      >
                        {selectedCity && selectedPincode 
                            ? `${selectedPincode?.value} (Change)` 
                            : "( Select  location )"}

                        {/* ( Select Location ) */}
                      </Link>
                    </div>
                  </div>

                  <Divider type="vertical" />

                  {/* Login */}
                  <div className="header-icon-block">
                    <div className="icon">
                      <Link className="label" to={"/profile/account"}>
                        <UserLarge />
                      </Link>
                    </div>
                    <div className="text">
                      {isUserLogin ? (
                        <Link className="label" to={"/profile/account"}>
                          <p>
                            {isUserDetail?.full_name
                              ? isUserDetail.full_name.length > 16
                                ? `${isUserDetail.full_name.slice(0, 16)}...`
                                : isUserDetail.full_name
                              : isUserDetail?.email
                              ? isUserDetail.email.length > 16
                                ? `${isUserDetail.email.slice(0, 16)}...`
                                : isUserDetail.email
                              : ""}
                          </p>
                        </Link>
                      ) : (
                        <Link
                          to=""
                          className="sub-label login"
                          onClick={() => setLoginModal(true)}
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </div>

                  <Divider type="vertical" />

                  <Badge
                    count={wishlistCount || ""}
                    size="small"
                    offset={[0, 5]}
                  >
                    <Link to={"/wishlist"} className="icon">
                      <Heart />
                    </Link>
                  </Badge>

                  <Divider type="vertical" />

                  <Badge count={cartCount || ""} size="small" offset={[0, 5]}>
                    <Link to={"/shoppingcart"} className="icon">
                      <Cart />
                    </Link>
                  </Badge>
                </div>

                <div className="mobile-menu">
                  {isUserLogin ? (
                    <Link className="label" to={"/profile/account"}>
                      <UserLarge />{" "}
                    </Link>
                  ) : (
                    <Link
                      to=""
                      className="sub-label login"
                      onClick={() => {
                        setLoginModal(true);
                        closeSidebar();
                      }}
                    >
                      Login
                    </Link>
                  )}

                  <Badge
                    count={wishlistCount || ""}
                    size="small"
                    offset={[0, 5]}
                  >
                    <Link to={"/wishlist"} className="icon">
                      <Heart />
                    </Link>
                  </Badge>
                  <Badge count={cartCount || ""} size="small" offset={[0, 5]}>
                    <Link to={"/shoppingcart"} className="icon">
                      <Cart />
                    </Link>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <nav className="navbar-wrapper">
            <div className="container">
              <MegaMenu />
            </div>
          </nav>
        </div>
      </header>

      <div className={`mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Logo />
          <button className="close-btn" onClick={closeSidebar}>
            ×
          </button>
        </div>
        <div className="main-content">
          <div className="search-container">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              {search_categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>

            <div className="search-field">
              <Input
                name="seach"
                placeholder="Search Product here..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                type="primary"
                icon={<Search />}
                className="search-btn"
                onClick={handleSearch}
              />
            </div>
          </div>
          <div className="header-icon-block">
            <span className="icon">
              <Location_red />
            </span>
            <div className="text">
              <div className="label">
                {selectedCity ? selectedCity?.name : "Where to deliver?"}{" "}
              </div>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  setLocationModal(true);
                  closeSidebar();
                }}
                className="sub-label"
                to="#"
              >
                {selectedCity && selectedPincode 
                    ? `${selectedPincode.value} (Change)` 
                    : "( Select location )"}
              
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar}></div>
      )}

      <Login setLoginModal={setLoginModal} loginModal={loginModal} />

      <Location
        locationModal={locationModal}
        setLocationModal={setLocationModal}
      />
    </>
  );
};

export default Header;
