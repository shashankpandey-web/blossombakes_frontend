import React, { useContext, useState } from "react";
import "./cart.scss";
import { Calendar, Cross } from "../../../icon/icons";
import { Link } from "react-router-dom";
import { Button, Skeleton, Input } from "antd";
import { ShoppingCartContext } from "../../../context";
import {
  ClockCircleOutlined,
  EditOutlined,
  RocketOutlined,
} from "@ant-design/icons";

const PriceDisplay = ({ regularPrice, discountPrice, discountPercentage }) => {
  const hasDiscount =
    discountPrice && parseFloat(discountPrice) < parseFloat(regularPrice);

  console.log("first", discountPercentage);

  return (
    <div className="price-display">
      {hasDiscount ? (
        <>
          <span className="discount-price">₹{regularPrice}</span>
          {/* <span className="regular-price-struck">₹{regularPrice}</span> */}
          {discountPercentage && (
            <span className="discount-badge">{discountPercentage}</span>
          )}
        </>
      ) : (
        <span className="regular-price">₹{regularPrice}</span>
      )}
    </div>
  );
};

const AddonQuantityControl = ({ quantity, onIncrease, onDecrease }) => (
  <div className="addon-quantity-controls">
    <Button size="small" onClick={onDecrease}>
      -
    </Button>
    <span className="quantity-number">{quantity}</span>
    <Button size="small" onClick={onIncrease}>
      +
    </Button>
  </div>
);

const Cart = () => {
  const {
    cart_list,
    handleCartItem,
    cartLoading,
    handleCartItemRemove,
    handleUpdateAddonQuantity,
    handleRemoveAddon,
  } = useContext(ShoppingCartContext);

  const [editingMessageId, setEditingMessageId] = useState(null);
  const [messageInputs, setMessageInputs] = useState({});

  const handleQuantityChange = (id, newQuantity) => {
    handleCartItem(newQuantity, id);
  };
  const handleRemoveItem = (id) => {
    handleCartItemRemove(id);
  };
  const handleMessageEdit = (id, currentMessage) => {
    setEditingMessageId(id);
    setMessageInputs((prev) => ({ ...prev, [id]: currentMessage || "" }));
  };
  const handleMessageChange = (id, value) => {
    setMessageInputs((prev) => ({ ...prev, [id]: value }));
  };
  const handleMessageSave = (id, quantity) => {
    if (id && quantity) {
      handleCartItem(quantity, id, messageInputs[id]);
    }
    setEditingMessageId(null);
  };

  if (cartLoading) {
    return (
      <div className="cart-wrapper">
        <div className="product-listing">
          <ul>
            {[...Array(2)].map((_, index) => (
              <li key={index}>
                <div className="main-product-display">
                  <div className="product-image">
                    <Skeleton.Image active className="cart-item-shimmer" />
                  </div>
                  <div className="product-details">
                    <Skeleton.Button active shape="circle" size="small" />
                    <Skeleton.Input
                      active
                      size="small"
                      block
                      style={{ marginBottom: 16, marginTop: 16 }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      block
                      style={{ width: "60%", marginBottom: 16 }}
                    />

                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "80%", marginTop: 16 }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className="product-listing">
        {cart_list?.length > 0 ? (
          <ul>
            {cart_list.map((item) => (
              <li key={item.id}>
                {/* A new wrapper for the main product layout */}
                <div className="main-product-display">
                  <div className="product-image">
                    <Link to={`/productdetail/${item?.slug}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                  </div>
                  <div className="product-details">
                    <Link
                      className="cross-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Cross />
                    </Link>
                    <h3>{item.name}</h3>
                    <PriceDisplay
                      regularPrice={item?.regular_price}
                      discountPrice={item?.discount_price}
                      discountPercentage={item?.discount_percentage}
                    />
                    <div className="weight-time">
                      {item?.flavour_title && (
                        <p>
                          Flavour: <span>{item.flavour_title}</span>
                        </p>
                      )}
                      {item?.weight_title && (
                        <p>
                          Weight: <span>{item.weight_title}</span>
                        </p>
                      )}
                      <p>
                        <Calendar />{" "}
                        {item?.shipping_title && <>{item.shipping_title} - </>}
                        {item?.shipping_slot_title && (
                          <>{item.shipping_slot_title} </>
                        )}
                        {item?.delivery_date && <>{item.delivery_date}</>}
                      </p>
                    </div>

                    <div className="quantity-wrap">
                      <div className="quantity_section">
                        <h3>QTY :</h3>
                        <div className="quantity-controls">
                          <Button
                            onClick={() =>
                              handleQuantityChange(item.id, item?.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="quantity-number">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() =>
                              handleQuantityChange(item.id, item?.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="cake-message">
                        <h3>Message Note:</h3>
                        {editingMessageId === item?.id ? (
                          <div className="message-edit">
                            <Input
                              value={messageInputs[item?.id] || ""}
                              onChange={(e) =>
                                handleMessageChange(item.id, e.target.value)
                              }
                              maxLength={25}
                              placeholder="Enter Message Note"
                            />
                            <Button
                              type="primary"
                              size="small"
                              className="add_message_btn"
                              onClick={() =>
                                handleMessageSave(item.id, item?.quantity)
                              }
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <div className="message-display">
                            <span>{item?.cake_message || "No message"}</span>
                            <Button
                              type="link"
                              size="small"
                              onClick={() =>
                                handleMessageEdit(item.id, item?.cake_message)
                              }
                              icon={<EditOutlined />}
                              style={{ padding: 0 }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- ADDON PRODUCTS SECTION --- */}
                {item.addon_products && item.addon_products.length > 0 && (
                  <div className="addon-section">
                    <h4 className="addon-section-title">Added Extras</h4>
                    <ul className="addon-product-list">
                      {item.addon_products.map((addon) => (
                        <li key={addon.addon_cart_id} className="addon-item">
                          <div className="addon-item-image">
                            <img
                              src={addon.image}
                              alt={addon.addon_product_title}
                            />
                          </div>
                          <div className="addon-item-details">
                            <h5>{addon.addon_product_title}</h5>
                            <PriceDisplay
                              regularPrice={addon.addon_regular_price}
                              discountPrice={addon.addon_discount_price}
                              discountPercentage={
                                addon.addon_discount_percentage
                              }
                            />
                          </div>

                          <div className="addon-item-quantity">
                            <AddonQuantityControl
                              quantity={addon.addon_cart_quantity}
                              onIncrease={() =>
                                handleUpdateAddonQuantity(
                                  addon.addon_cart_id,
                                  addon.addon_cart_quantity + 1
                                )
                              }
                              onDecrease={() =>
                                handleUpdateAddonQuantity(
                                  addon.addon_cart_id,
                                  addon.addon_cart_quantity - 1
                                )
                              }
                            />
                          </div>
                          <div className="addon-item-total">
                            <span>₹{addon.total}</span>
                          </div>
                          <div className="addon-item-remove">
                            <Button
                              type="text"
                              danger
                              size="small"
                              icon={<Cross />}
                              onClick={() =>
                                handleRemoveAddon(addon.addon_cart_id)
                              }
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
