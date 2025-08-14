import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import "./otp.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOtpUtils } from "./otpUtils";
import Loading from "../../Loader/Loading";

const Otp = ({
  otpModal,
  setOtpModal,
  setLoginModal,
  loginData,
  setLoginData,
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const { verifyOtp, resendOtp } = useOtpUtils();


  
  useEffect(() => {
    let interval;
    if (otpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [otpModal, timer]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      errorMsg("Please enter a valid 4-digit OTP");
      return;
    }
    setLoading(true);
    await verifyOtp(
      loginData,
      otp,
      navigate,
      setOtpModal,
      setOtp,
      setLoginData
    );

    setLoading(false);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setOtp("");
    const { success } = await resendOtp(loginData, navigate);
    if (success) {
      setTimer(60);
      setCanResend(false);
      setOtp("");
    }
    setLoading(false);
  };

  return (
    <Modal
      className="otp-modal"
      centered
      open={otpModal}
      onCancel={() => {
        setOtpModal(false);
        setOtp("");
      }}
      footer={null}
      destroyOnClose
    >
      <Loading isLoading={loading}>
        <div className="modal-content">
          <h3>OTP Verification</h3>
          <div className="number-visible">
            <p>
              Enter your 4 digit code sent to{" "}
              <span>{loginData?.email || loginData?.mobile}</span>
            </p>
            <Link
              onClick={() => {
                setLoginModal(true);
                setOtpModal(false);
                setOtp("");
              }}
            >
              Edit
            </Link>
          </div>

          <Input.OTP
            className="otp-input"
            length={4}
            value={otp}
            onChange={setOtp}
            disabled={loading}
          />

          <button
            className="submit-btn"
            onClick={handleVerifyOtp}
            disabled={otp.length !== 4}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>

          <div className="timer-otp">
            {canResend ? (
              <Link onClick={handleResendOtp} disabled={loading}>
                Resend OTP
              </Link>
            ) : (
              <>
                <Link className="disabled-link">Resend</Link>
                <p>{timer}sec</p>
              </>
            )}
          </div>
        </div>
      </Loading>
    </Modal>
  );
};

export default Otp;
