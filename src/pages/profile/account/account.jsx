import React, { useEffect } from "react";
import { Form, Input, DatePicker, Button } from "antd";
import moment from "moment";
import { useAccountUtils } from "./accountUtils";
import "./account.scss";
import { useSelector } from "react-redux";
import Loading from "../../../component/Loader/Loading";
import dayjs from "dayjs";
import SEO from "../../../component/SEO/SEO";

const Account = () => {
  const { setting } = useSelector((state) => state.setting);
  const { form, loading, handleSubmit } = useAccountUtils();
  const {
    isUserDetail,
    isUserLogin,
    loading: userLoading,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUserLogin) {
      form.setFieldsValue({
        full_name: isUserDetail.full_name,
        email: isUserDetail.email,
        phone_number: isUserDetail.phone_number,
        date_of_birth: isUserDetail.date_of_birth
          ? dayjs(isUserDetail.date_of_birth, "YYYY-MM-DD")
          : null,
        date_of_anniversary: isUserDetail.date_of_anniversary
          ? dayjs(isUserDetail.date_of_anniversary, "YYYY-MM-DD")
          : null,
      });
    }
  }, [isUserLogin]);

  return (
    <>
      <SEO
        title={setting?.meta_title}
        description={setting?.meta_description}
        keywords={setting?.meta_keywords}
      />

      <Loading isLoading={loading || userLoading}>
        <div className="account-wrapper">
          <div className="top-heading">
            <h3>Profile Details</h3>
          </div>
          <div className="content-container">
            <Form
              form={form}
              layout="horizontal"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 12 }}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Name"
                name="full_name"
                rules={[
                  { required: true, message: "Please enter your name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>

              <Form.Item
                label="Mobile No"
                name="phone_number"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter valid 10-digit number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Mobile"
                  maxLength={10}
                  disabled={isUserDetail?.phone_number}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input
                  placeholder="Enter Email"
                  disabled={isUserDetail?.email}
                />
              </Form.Item>

              <Form.Item label="Date of Birth" name="date_of_birth">
                <DatePicker
                  style={{ width: "100%" }}
                  value={form.getFieldValue("date_of_birth")} // or use getFieldDecorator
                  onChange={(date) =>
                    form.setFieldsValue({ date_of_birth: date })
                  }
                  disabledDate={(current) =>
                    current && current > moment().endOf("day")
                  }
                />
              </Form.Item>

              <Form.Item label="Anniversary" name="date_of_anniversary">
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) =>
                    current && current > moment().endOf("day")
                  }
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="edit-profile"
                >
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Loading>
    </>
  );
};

export default Account;
