import React, { useContext, useState } from "react";
import "./coupon.scss";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../../context";

const Coupon = ({ couponModal, setcouponModal }) => {
  const { coupon_list, handleApplyCoupon, handleRemoveCoupon } =
    useContext(ShoppingCartContext);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal
        className="coupon-modal"
        centered
        open={couponModal}
        onCancel={() => setcouponModal(false)}
        footer={null}
      >
        <div className="modal-content">
          <div className="title">
            <h3>{coupon_list?.length || 0} Coupons available</h3>
          </div>
          <div className="table-main">
            <table>
              <tbody>
                {coupon_list?.map((coupon, index) => (
                  <tr key={index}>
                    <td>
                      <p> {coupon.description}</p>
                    </td>
                    <td>
                      <h4> {coupon.title}</h4>
                    </td>
                    <td>
                      <div className="use-code">
                        <h3>Use Code: {coupon.code}</h3>
                      </div>
                    </td>
                    <td>
                      {appliedCoupon == coupon.code || coupon?.is_applied ? (
                        <Link
                          className="remove-btn"
                          onClick={() =>
                            handleRemoveCoupon(
                              coupon.code,
                              setLoading,
                              setAppliedCoupon
                            )
                          }
                          disabled={loading}
                        >
                          Remove
                        </Link>
                      ) : (
                        <Link
                          className="apply-btn"
                          onClick={(e) => {
                            if (loading || appliedCoupon !== null) {
                              e.preventDefault();
                              return;
                            }
                            handleApplyCoupon(
                              coupon.code,
                              setLoading,
                              setAppliedCoupon
                            );
                          }}
                          disabled={loading || appliedCoupon !== null}
                        >
                          {loading && appliedCoupon === coupon.code
                            ? "Applying..."
                            : "Apply"}
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Coupon;
