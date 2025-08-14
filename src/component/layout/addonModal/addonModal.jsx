import React from "react";
import "./addonModal.scss";
import { Button, Col, Modal, Row, Skeleton, Tabs } from "antd";
import { LogoWhite, Plus } from "./../../../icon/icons";
import image from "../../../utils/helpers";
import { useAddonModalUtils } from "./useAddonModalUtils";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

const QuantityControl = ({ quantity, onIncrease, onDecrease }) => (
  <div className="quantity-controls">
    <Button size="small" onClick={onDecrease}>
      -
    </Button>
    <span className="quantity-number">{quantity}</span>
    <Button size="small" onClick={onIncrease}>
      +
    </Button>
  </div>
);

const AddonCard = ({ item, isSelected, quantity, onAdd, onQuantityChange }) => {
  const hasDiscount =
    item.discount_price &&
    parseFloat(item.discount_price) < parseFloat(item.regular_price);
  return (
    <div className={`common-addon-card ${isSelected ? "selected" : ""}`}>
      {hasDiscount && (
        <div class="discount-wrap">
          <p>50% Off</p>
        </div>
      )}

<div className="product-image-container">
  
      <img src={item.image} alt={item.title} />
</div>
      <h3>{item.title}</h3>
      <div className="price-wrap">
        {hasDiscount ? (
          <>
            <div className="discount_price_wrapper">
              <p className="discount-price">₹{item.discount_price}</p>
              <p className="regular-price-struck">₹{item.regular_price}</p>
            </div>
          </>
        ) : (
          <p className="regular-price">₹{item.regular_price}</p>
        )}

        {isSelected ? (
          <QuantityControl
            quantity={quantity}
            onIncrease={() => onQuantityChange(item.id, quantity + 1)}
            onDecrease={() => onQuantityChange(item.id, quantity - 1)}
          />
        ) : (
          <button className="plus-btn" onClick={() => onAdd(item)}>
            Add
          </button>
        )}
      </div>
    </div>
  );
};

const AddonSkeleton = () => (
  <Row gutter={24}>
    {[...Array(4)].map((_, i) => (
      <Col key={i} xs={24} sm={12} md={6}>
        <div className="common-addon-card">
          <Skeleton.Image active style={{ width: "100%", height: 220 }} />
          <Skeleton.Input
            active
            size="small"
            style={{ margin: 10, width: "90%" }}
            block
          />
          <Skeleton.Input
            active
            size="small"
            style={{ margin: 10, width: "60%" }}
            block
          />
        </div>
      </Col>
    ))}
  </Row>
);

const addonModal = ({ addonModal, setAddonModal, product, onContinue }) => {
  const {
    loading,
    error,
    activeCategory,
    addonProducts,
    selectedAddons,
    handleTabChange,
    handleAddAddon,
    handleUpdateAddonQuantity,
  } = useAddonModalUtils(product, product?.addons, addonModal);

  const navigate = useNavigate();

  const handleContinue = () => {
    if (onContinue) {
      onContinue(selectedAddons);
    }
    setAddonModal(false);
  };

  return (
    <>
      <Modal
        centered
        open={addonModal}
        footer={null}
        onCancel={() => {
          setAddonModal(false), navigate("/shoppingcart");
        }}
        className="addon-modal-wrapper"
        width={1440}
      >
        <div className="modal-content">
          <div className="modal-header">
            <LogoWhite />
            <h3>Make it extra special</h3>
          </div>

          <div className="container">
            <div className="scroll-container">
              {product?.addons?.length > 0 ? (
                <Tabs
                  activeKey={(
                    activeCategory || product.addons[0]?.id
                  )?.toString()}
                  onChange={handleTabChange}
                  centered
                  className="addon-tabs"
                >
                  {product.addons.map((category) => (
                    <TabPane tab={category.title} key={category.id}>
                      {loading && <AddonSkeleton />}

                      {!loading && !error && (
                        <Row gutter={24}>
                          {addonProducts.map((item) => {
                            const selectedItem = selectedAddons.find(
                              (a) => a.id === item.id
                            );
                            const isSelected = !!selectedItem;
                            const currentQuantity = selectedItem
                              ? selectedItem.quantity
                              : 0;

                            return (
                              <Col key={item.id} xs={24} sm={12} md={6}>
                                <AddonCard
                                  item={item}
                                  isSelected={isSelected}
                                  quantity={currentQuantity}
                                  onAdd={handleAddAddon}
                                  onQuantityChange={handleUpdateAddonQuantity}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                      )}
                    </TabPane>
                  ))}
                </Tabs>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="footer-btn">
          <button
            className="skip-btn"
            onClick={() => navigate("/shoppingcart")}
          >
            Skip
          </button>
          <button className="continue-btn" onClick={handleContinue}>
            Continue ({selectedAddons.length})
          </button>
        </div>
      </Modal>
    </>
  );
};

export default addonModal;
