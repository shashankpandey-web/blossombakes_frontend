import React, { useState } from "react";
import "./login.scss";
import { Button, Form, Input, Modal } from "antd";
import image from "./../../../utils/helpers";
import { Link } from "react-router-dom";
import Otp from "./../otp/otp";
import { LoginUtils } from "./loginUtils";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { errorMsg } from "../../../actions/customFn";
import FacebookLogin from "@greatsumini/react-facebook-login"; 
import { FacebookFilled } from "@ant-design/icons"; 

import Loading from "../../Loader/Loading";
const login = ({ loginModal, setLoginModal }) => {
  const {
    handleLogin,
    loading,
    loginData,
    otpModal,
    validateUsername,
    form,
    setOtpModal,
    setLoginData,
    handleGoogleSuccess,
    handleGoogleError,
     handleFacebookSuccess, // <-- 2. DESTRUCTURE THE NEW FUNCTION
    handleFacebookError,   // <-- 2. DESTRUCTURE THE NEW FUNCTION
  } = LoginUtils();

  return (
    <>
      <Modal
        className="login-modal"
        centered
        open={loginModal}
        onCancel={() => setLoginModal(false)}
        footer={null}
        preserve={false}
        destroyOnClose
      >
        <Loading isLoading={loading}>
          <div className="login-body">
            <div className="login-banner">
              <img src={image["login-logo.png"]} alt="logo" />
              <p>Every gift has a story</p>
            </div>

            <div className="content-wrap">
              <h3>Customer Login</h3>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleLogin}
                autoComplete="off"
              >
                <Form.Item
                  name="username"
                  rules={[{ validator: validateUsername }]}
                >
                  <Input placeholder="Enter Mobile/Email" size="large" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-btn"
                    loading={loading}
                    block
                  >
                    Continue
                  </Button>
                </Form.Item>
              </Form>
              <p>
                <span></span>Or Login with<span></span>
              </p>
              <div className="login-options">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="filled_blue"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  logo_alignment="left"
                />

                {/* <FacebookLogin
                  appId="720671260810538" // <-- IMPORTANT: Replace this!
                  onSuccess={handleFacebookSuccess}
                  onFail={handleFacebookError}
                  render={({ onClick, logout }) => (
                    <button className="facebook-custom-btn" onClick={onClick}>
                      <FacebookFilled /> Continue with Facebook
                    </button>
                  )}
                /> */}

                {/* <div onClick={googleLogin} style={{ cursor: "pointer" }}>
                  <img src={image["login-google.png"]} alt="google" />
                </div> */}

                {/* <Link>
                <img src={image["login-facebook.png"]} alt="facebook" />
              </Link>
              <Link>
                <img src={image["login-instagram.png"]} alt="instagram" />
              </Link> */}
              </div>
            </div>
          </div>
        </Loading>
      </Modal>
      <Otp
        otpModal={otpModal}
        setOtpModal={setOtpModal}
        setLoginModal={setLoginModal}
        loginData={loginData}
        setLoginData={setLoginData}
      />
    </>
  );
};

export default login;
