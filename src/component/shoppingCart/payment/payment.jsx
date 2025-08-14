import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Radio,
  Space,
  Typography,
  message,
  Divider,
  Row,
  Col,
  Image,
} from "antd";
import {
  CreditCardOutlined,
  PayCircleOutlined,
  WalletOutlined,
  DollarOutlined,
  SafetyOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./payment.scss";
import { ShoppingCartContext } from "../../../context";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const Payment = () => {
  const { paymentMethod, setPaymentMethod } = useContext(ShoppingCartContext);
  const { razorpay, cod } = useSelector((state) => state.cart);

  const paymentOptions = [
    {
      id: "cod",
      title: "Cash on Delivery",
      description: "Pay when you receive your order",
      icon: <DollarOutlined className="payment-icon cod-icon" />,
      benefits: ["No advance payment required", "Pay to delivery executive"],
      status: cod,
    },

    {
      id: "razorpay",
      title: "Pay with Razorpay",
      description: "Secure payment with cards, UPI, net banking",
      icon: <PayCircleOutlined className="payment-icon razorpay-icon" />,
      benefits: [
        "Instant confirmation",
        "SSL secured payment",
        "Multiple payment options",
      ],
      status: razorpay,
    },
  ];

  console.log("paymentOptionspaymentOptionspaymentOptions",paymentOptions , razorpay , cod)

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <Title level={3} className="payment-title">
          Select Payment Method
        </Title>

        <Card className="payment-methods-card" bordered={false}>
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            className="payment-methods-group"
          >
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              {paymentOptions.map(
                (option) =>
                  option?.status && (
                    <>
                      <Radio
                        key={option.id}
                        value={option.id}
                        className="payment-option"
                      >
                        <div className="payment-option-content">
                          <div className="payment-icon-container">
                            {option.icon}
                          </div>
                          <div className="payment-details">
                            <Text strong>{option.title}</Text>
                            <Text type="secondary">{option.description}</Text>
                            <div className="benefits-list">
                              {option.benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                  <CheckCircleOutlined className="benefit-icon" />
                                  <Text>{benefit}</Text>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Radio>
                    </>
                  )
              )}
            </Space>
          </Radio.Group>
        </Card>

        <Divider />

        <div className="payment-security-info">
          <Row gutter={16} align="middle">
            <Col span={24}>
              <div className="security-badge">
                <SafetyOutlined className="security-icon" />
                <Text strong>100% Secure Payments</Text>
                <Text type="secondary">
                  All transactions are encrypted and secure
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Payment;
