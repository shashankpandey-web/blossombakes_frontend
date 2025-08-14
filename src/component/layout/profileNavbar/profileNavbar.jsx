import React from 'react';
import './profilenavbar.scss';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import UseProfileUtils from './profileNavbarUtils';
import { Logout, Order, Userred } from '../../../icon/icons';

const ProfileNavbar = ({ toggleOnMobile, isOpen }) => {
    const { handleClick } = UseProfileUtils();
    const location = useLocation();

    const getSelectedKey = (path) => {
        if (path.startsWith('/profile/order-history') || path.startsWith('/profile/orderdetail') || path.startsWith('/profile/review')){
            return '/profile/order-history';
        }
        if (path.startsWith('/profile/account')) {
            return '/profile/account';
        }
        return '';
    };

    return (
        <div className={`profile-navbar ${isOpen ? 'active' : ''}`}>
            <h3>My Account</h3>
            <Menu
                mode="inline"
                selectedKeys={[getSelectedKey(location.pathname)]}
                className="profile-menu"
            >
                <Menu.Item key="/profile/account">
                    <Link to="/profile/account" onClick={toggleOnMobile}>
                        <Userred/> My Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="/profile/order-history">
                    <Link to="/profile/order-history" onClick={toggleOnMobile}>
                        <Order/> My Orders
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <span className="logout-btn" onClick={handleClick}>
                       <Logout/> Log-out
                    </span>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default ProfileNavbar;
