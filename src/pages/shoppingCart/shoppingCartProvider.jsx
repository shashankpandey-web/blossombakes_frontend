import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainContext, ShoppingCartContext } from "../../context";
import { getCartList } from "../../redux/action/cartAction";
import BasicProvider from "../../services/basicProvider";
import { API_ENDPOINTS } from "../../config/endPoints";
import { errorMsg, successMsg } from "../../actions/customFn";
import { clearCart } from "../../redux/slice/cartSlice";
import { userDetail } from "../../redux/action/authAction";

const ShoppingCartProvider = ({ children }) => {
  const {
    cart_list,
    cart_total,
    coupon_list,
    applied_coupon_code,
    loading: cartDataLoading,
    rozar_pay_data,
    cod,
    razorpay,
  } = useSelector((state) => state.cart);
  const { isUserDetail } = useSelector((state) => state.auth);
  const { loginModal, setLoginModal } = useContext(MainContext);
  const { isUserLogin, loading: userLoading } = useSelector(
    (state) => state.auth
  );
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartLoading, setCartLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [addressData, setAddressData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(null);
  const [isCheckoutPayProcessing, setIsCheckoutPayProcessing] = useState(false);

  useEffect(() => {
    if (razorpay) {
      setPaymentMethod("razorpay");
    }
  }, [cod, razorpay]);

  useEffect(() => {
    if (isUserLogin) {
      setAddressData(isUserDetail);
    }
  }, [isUserLogin, isUserDetail]);

  const handleCartList = (obj) => {
    dispatch(getCartList({ navigate }));
  };

  useEffect(() => {
    dispatch(getCartList({ navigate })).finally(() => setCartLoading(false));
  }, []);

  const handleCartItem = (quantity, id, message = "") => {
    const sendData = { cart_id: id, quantity };

    if (message && message.trim() !== "") {
      sendData.cake_message = message;
    }

    new BasicProvider(`${API_ENDPOINTS?.update_cart}`, navigate, true)
      .postRequest(sendData)
      .then((response) => {
        const { status, message } = response;

        if (status) {
          handleCartList();
          successMsg(message);
        } else {
          errorMsg(message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCartItemRemove = (id) => {
    const sendData = { cart_id: id };
    new BasicProvider(`${API_ENDPOINTS?.delete_cart}`, navigate, true)
      .postRequest(sendData)
      .then((response) => {
        const { status, message } = response;
        if (status) {
          handleCartList();
          successMsg(message);
        } else {
          errorMsg(message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleApplyCoupon = (couponCode, setLoading, setAppliedCoupon) => {
    setLoading(true);
    new BasicProvider(API_ENDPOINTS.apply_coupon, navigate, true)
      .postRequest({
        coupon_code: couponCode,
      })
      .then((response) => {
        if (response?.status) {
          successMsg(response.message);
          setAppliedCoupon(couponCode);
          handleCartList();
        } else {
          errorMsg(response.message);
        }
      })
      .catch((error) => {
        errorMsg("Failed to apply coupon");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoveCoupon = (coupon_code, setLoading, setAppliedCoupon) => {
    setLoading(true);

    new BasicProvider(API_ENDPOINTS.remove_coupon, navigate, true)
      .postRequest({
        coupon_code: coupon_code,
      })
      .then((response) => {
        if (response?.status) {
          successMsg(response.message);
          setAppliedCoupon(null);
          handleCartList();
        } else {
          errorMsg(response.message);
        }
      })
      .catch((error) => {
        message.error("Failed to remove coupon");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStepChange = (step) => {
    if (step > 0 && !isUserLogin) {
      setLoginModal(true);
      return;
    }
    setCurrentStep(step);
  };

  const callCheckoutPay = async (payToken, incr_order_id, order_id) => {
    try {
      setIsCheckoutPayProcessing(true);

      const payload = { payToken, order_id: incr_order_id };
      const provider = new BasicProvider(
        `${API_ENDPOINTS?.checkoutpay}`,
        navigate,
        true
      );
      const response = await provider.postRequest(payload);

      if (response?.status) {
        successMsg(response?.message || "Payment successful!");
        dispatch(clearCart());
        dispatch(userDetail({ navigate }));
        navigate(`/order-success/${incr_order_id}`, {
          state: {
            id: order_id,
          },
        });
      } else {
        errorMsg(response?.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("CheckoutPay Error:", err);
      errorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsCheckoutPayProcessing(false);
    }
  };

  const checkoutcart = async () => {
    try {
      if (!isUserLogin) {
        setLoginModal(true);
        return;
      }

      const provider = new BasicProvider(
        `${API_ENDPOINTS?.checkoutcart}`,
        navigate,
        true
      );
      const response = await provider.postRequest({});
      if (response?.status) {
        handleStepChange(1);
      }
    } catch (err) {
      console.error("CheckoutPay Error:", err);
      errorMsg("An unexpected error occurred. Please try again.");
    } finally {
    }
  };

  const checkoutaddress = async (value) => {
    try {
      const provider = new BasicProvider(
        `${API_ENDPOINTS?.checkoutaddress}`,
        navigate,
        true
      );
      const response = await provider.postRequest(value);
      if (response?.status) {
        handleStepChange(2);
      } else {
        errorMsg(response?.message);
      }
    } catch (err) {
      console.error("CheckoutPay Error:", err);
      errorMsg("An unexpected error occurred. Please try again.");
    } finally {
    }
  };

  // checkout
  const placeOrder = () => {
    if (!isUserLogin) {
      setLoginModal(true);
      return;
    }

    if (!addressData) {
      errorMsg("Please provide delivery address");
      return Promise.reject("Address data missing");
    }

    console.log("addressData?.same_as_shipping", addressData?.same_as_shipping);
    const orderData = {
      payment_method: paymentMethod,
      full_name: addressData?.full_name || "",
      email: addressData?.email,
      phone_number: addressData?.phone_number,
      address_type: addressData?.address_type,
      address_1: addressData?.address_1,
      state_id: addressData?.state_id,
      city_id: addressData?.city_id,
      postal_code: addressData?.postal_code,
      alternet_phone_number: addressData?.alternet_phone_number,
      same_as_shipping: addressData?.same_as_shipping ? 0 : 1,

      // Billing / sender details
      bl_full_name: addressData?.bl_full_name || "",
      bl_phone_number: addressData?.bl_phone_number,
      bl_email: addressData?.bl_email,
      bl_address_type: addressData?.address_type,
      bl_address_1: addressData?.bl_address_1,
      bl_state_id: addressData?.bl_state_id,
      bl_city_id: addressData?.bl_city_id,
      bl_postal_code: addressData?.bl_postal_code,

      occation_id: addressData?.occation_id,
      message_card: addressData?.message_card,
    };

    setIsProcessing(true);
    new BasicProvider(`${API_ENDPOINTS?.checkout}`, navigate, true)
      .postRequest(orderData)
      .then((response) => {
        console.log("response", response);
        if (response?.status) {
          if (orderData?.payment_method == "cod") {
            dispatch(clearCart());
            successMsg(response?.message);
            navigate(`/order-success/${response.order_id}`, {
              state: {
                id: response.id,
              },
            });
            dispatch(userDetail({ navigate }));
          } else {
            const increp_order_id = response.order_id;
            const order_id = response.id;
            // CASE 2: UPI - call Razorpay
            const amountInPaise = response?.total_amount * 100;
            const rzpOptions = {
              key: rozar_pay_data?.RAZORPAY_KEY_ID,
              amount: amountInPaise,
              currency: "INR",
              name: "blossomcakes",
              description: "Order Payment",
              handler: async function (response) {
                const payToken = response.razorpay_payment_id;
                setIsProcessing(true);
                try {
                  await callCheckoutPay(payToken, increp_order_id, order_id);
                } catch (error) {
                  console.error("Payment handler error:", error);
                  errorMsg("Payment failed. Try again.");
                } finally {
                  setIsProcessing(false);
                }
              },
              modal: {
                ondismiss: function () {
                  setIsProcessing(false);
                  setTimeout(() => {
                    setIsProcessing(false); // force reset just in case
                    document.body.style.overflow = "";
                  }, 500);
                  errorMsg("Payment is cancelled.");
                },
              },
              theme: {
                color: "#3399cc",
              },
            };

            if (window.Razorpay) {
              const rzp = new window.Razorpay(rzpOptions);
              rzp.open();
            } else {
              errorMsg(
                "Payment system is unavailable. Please refresh the page."
              );
            }
          }
        } else {
          errorMsg(response?.message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleUpdateAddonQuantity = (addonCartId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveAddon(addonCartId);
      return;
    }

    const sendData = {
      addon_cart_id: addonCartId,
      quantity: newQuantity,
    };

    new BasicProvider(`${API_ENDPOINTS?.update_addon_cart}`, navigate, true)
      .postRequest(sendData)
      .then((response) => {
        if (response?.status) {
          handleCartList();
        } else {
          errorMsg(response.message || "Failed to update addon.");
        }
      })
      .catch((err) => {
        console.error(err);
        errorMsg("An error occurred while updating the addon.");
      });
  };

  const handleRemoveAddon = (addonCartId) => {
    const sendData = { addon_cart_id: addonCartId };

    new BasicProvider(`${API_ENDPOINTS?.delete_addon_cart}`, navigate, true)
      .postRequest(sendData)
      .then((response) => {
        if (response?.status) {
          successMsg(response.message || "Addon removed.");
          handleCartList();
        } else {
          errorMsg(response.message || "Failed to remove addon.");
        }
      })
      .catch((err) => {
        console.error(err);
        errorMsg("An error occurred while removing the addon.");
      });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart_list,
        handleCartItem,
        cartLoading,
        handleCartItemRemove,
        cart_total,
        coupon_list,
        cartDataLoading,
        handleApplyCoupon,
        handleRemoveCoupon,
        applied_coupon_code,
        placeOrder,
        handleStepChange,
        currentStep,
        setCurrentStep,
        paymentMethod,
        setPaymentMethod,
        setAddressData,
        addressData,
        isProcessing,
        isUserLogin,
        userLoading,
        isCheckoutPayProcessing,
        checkoutcart,
        checkoutaddress,
        handleUpdateAddonQuantity,
        handleRemoveAddon,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
