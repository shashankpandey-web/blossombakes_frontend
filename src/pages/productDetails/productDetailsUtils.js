// productDetailsUtils.js
import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BasicProvider from "../../services/basicProvider";
import {
  addToMostViewed,
  errorMsg,
  getMostViewed,
  successMsg,
} from "../../actions/customFn";
import { toggleWishlist } from "../../redux/action/wishlistAction";
import { API_ENDPOINTS } from "../../config/endPoints";
import { useDispatch } from "react-redux";

import { getCartList } from "../../redux/action/cartAction";
import { number } from "framer-motion";
import { MainContext } from "../../context";

export const useProductDetailsUtils = () => {
    const {  selectedPincode : selectedPostcode} = useContext(MainContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addonModal, setAddonModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);
  const [weight, setWeight] = useState("");
  const [flavor, setFlavor] = useState("");
  const [pincode, setPincode] = useState(selectedPostcode?.value);
  const [pincodeValid, setPincodeValid] = useState(false);
  const [cartId, setCartId] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [modalView, setModalView] = useState("calendar");
  const weightRef = useRef(null);
  const flavorRef = useRef(null);
  const pincodeRef = useRef(null);
  const deliveryDateRef = useRef(null);
  

 useEffect(() => {
setPincode(selectedPostcode?.value)
 },[selectedPostcode])

  // Add this validation function
  const validatePincode = (code) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(code);
  };

  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isSuccess: false,
  });

  const [eggType, setEggType] = useState(
    product?.eggless == "Yes"
      ? "without"
      : product?.eggless == "No"
      ? "with"
      : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState(0);
  const [cakeMessage, setCakeMessage] = useState("");
  const [deliverySlots, setDeliverySlots] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [isSlotModalVisible, setIsSlotModalVisible] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [errors, setErrors] = useState({
    weight: "",
    deliveryDate: "",
  });

  const clearErrors = () => {
    setErrors({
      weight: "",
      deliveryDate: "",
    });
  };

  useEffect(() => {
    if (product?.id) {
      addToMostViewed(product.id);
    }
  }, [product?.id]);

  useEffect(() => {
   
    if (!isSlotModalVisible) {
      setTimeout(() => setModalView("calendar"), 300);
    }
  }, [isSlotModalVisible]);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        const mostViewedIds = getMostViewed();
        const response = await new BasicProvider(
          API_ENDPOINTS.productsDetails,
          navigate,
          true,
          false,
          { useMinDelay: true }
        ).postRequest({ slug, most_viewed: mostViewedIds });

        if (response?.status && response?.data) {
          setProduct(response.data);
          setIsInWishlist(response.data.is_wishlist);

          if (
            response.data.product_weight &&
            response.data.product_weight.length > 0
          ) {
            const firstWeight = response.data.product_weight[0];
            setWeight(firstWeight.weight_id.toString());
            // // Update eggType based on product data
            setEggType(response.data.eggless === "Yes" ? "without" : "with");
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
        errorMsg(err.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug, navigate]);

  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    if (!product) return;

    setWishlistLoading(true);
    try {
      const data = {
        slug: product.slug,
        isInWishlist,
        navigate,
        onSuccess: () => {
          setIsInWishlist(!isInWishlist);
        },
        dispatch,
      };
      await toggleWishlist(data);
    } catch (err) {
      errorMsg(err.message || "Failed to update wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  const formatWeights = () => {
    if (!product?.product_weight || product.product_weight.length == 0)
      return [];
    return product?.product_weight.map((weight) => ({
      value: weight.weight_id.toString(),
      label: weight.title,
      regularPrice: weight.regular_price,
      discountedPrice: weight.discount_price,
    }));
  };

  const handleContinueWithAddons = async (selectedAddons) => {
    const addon_product_id = selectedAddons.map((item) => Number(item.id));
    const quantity = selectedAddons.map((item) => Number(item.quantity));
    const addon_id = selectedAddons.map((item) => Number(item.addon_id));

    const payload = {
      addon_product_id,
      quantity,
      slug: slug,
      cart_id: cartId,
      addon_id: addon_id,
    };

    const response = await new BasicProvider(
      API_ENDPOINTS.addToaddoncart,
      navigate,
      true,
      "",
      { useMinDelay: true }
    ).postRequest(payload);

    if (response?.status) {
      navigate("/shoppingcart");
    }
  };

  const showAddToCartModal = (title, message, isSuccess = false) => {
    setModalContent({
      title,
      message,
      isSuccess,
    });
    setIsAddToCartModalVisible(true);
  };

  const handleAddToCart = async (is_buy_now = false) => {
    clearErrors();

    let isValid = true;
    const newErrors = {
      weight: "",
      deliveryDate: "",
    };

    if (product?.product_weight?.length > 0 && !weight) {
      newErrors.weight = "Please select a weight";
      isValid = false;
    }

    if (product?.flavours?.length > 0 && !flavor) {
      newErrors.flavor = "Please select a flavor.";
      isValid = false;
    }

    if (!pincode) {
      newErrors.pincode = "Please enter a pincode";
      isValid = false;
    } else if (!validatePincode(pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
      isValid = false;
    }

     if(pincode){
       if ((!deliveryDate || !selectedSlot)) {
         newErrors.deliveryDate = "Please select a delivery date and time slot.";
         isValid = false;
       }

     }

    if (!isValid) {
      setErrors(newErrors);

      if (newErrors.flavor && flavorRef.current) {
        flavorRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        flavorRef.current.focus();
      } else if (newErrors.pincode && pincodeRef.current) {
        pincodeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        pincodeRef.current.focus();
      } else if (newErrors.deliveryDate && deliveryDateRef.current) {
        deliveryDateRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        deliveryDateRef.current.focus();
      }

      return;
    }
    setCartLoading(true);

    try {
      const cartData = {
        slug: product.slug,
        quantity,
        weight_id: weight,
        flavour_id: flavor,
        delivery_date: deliveryDate.format("YYYY-MM-DD"),
        shipping_id: selectedShipping,
        shipping_slot_id: selectedSlot,
        cake_message: cakeMessage,
        selected_pincode: pincode,
      };

      new BasicProvider(`${API_ENDPOINTS?.add_to_cart}`, navigate, true, "", {
        useMinDelay: true,
      })
        .postRequest(cartData)
        .then((response) => {
          if (response?.status) {
            successMsg(response?.message || "Added to cart successfully");
            dispatch(getCartList({ navigate }));

            if (is_buy_now) {
              setCartId(response?.cart_id);
              setAddonModal(true);
              // handleAddToCart(true);
              // navigate("/shoppingcart");
            } else {
              navigate("/shoppingcart");
            }
          } else {
            errorMsg(response?.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      errorMsg(err.message || "Failed to add to cart");
    } finally {
      setCartLoading(false);
    }
  };

  const getCurrentWeightDetails = () => {
    if (
      !product?.product_weight ||
      product.product_weight.length === 0 ||
      !weight
    )
      return null;
    return product.product_weight.find(
      (w) => w.weight_id.toString() === weight
    );
  };

  const fetchDeliverySlots = async (date) => {
    if (!date) return;
    setSlotLoading(true);
    setDeliverySlots([]);
    setSelectedShipping(null);
    setSelectedSlot(null);

    try {
      const response = await new BasicProvider(
        API_ENDPOINTS.getShipping,
        navigate,
        true,
        false,
        { useMinDelay: true }
      ).postRequest({
        slug: slug,
        delivery_date: date.format("YYYY-MM-DD"),
      });

      if (response?.status) {
        setDeliverySlots(response.data);
      } else {
        errorMsg(response.message || "Could not fetch delivery slots.");
        setDeliverySlots([]);
      }
    } catch (err) {
      errorMsg(err.message || "Failed to fetch delivery slots.");
    } finally {
      setSlotLoading(false);
    }
  };

  return {
    loading,
    product,
    error,
    isInWishlist,
    wishlistLoading,
    handleWishlistToggle,
    weights: formatWeights(),
    handleAddToCart,
    weight,
    eggType,
    quantity,
    setQuantity,
    setEggType,
    setWeight,
    setCakeMessage,
    cakeMessage,
    setDeliveryDate,
    deliveryDate,
    cartLoading,
    showAddToCartModal,
    isAddToCartModalVisible,
    setIsAddToCartModalVisible,
    modalContent,
    cartLoading,
    getCurrentWeightDetails,
    errors,
    setErrors,
    pincode,
    setPincode,
    pincodeValid,
    pincodeError,
    validatePincode,
    setFlavor,
    flavor,
    handleContinueWithAddons,
    addonModal,
    setAddonModal,
    deliverySlots,
    slotLoading,
    isSlotModalVisible,
    setIsSlotModalVisible,
    selectedShipping,
    setSelectedShipping,
    selectedSlot,
    setSelectedSlot,
    fetchDeliverySlots,
    clearErrors,

    flavorRef,
    pincodeRef,
    deliveryDateRef,
    modalView, // <-- EXPORT
    setModalView,
  };
};
