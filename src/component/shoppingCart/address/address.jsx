import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Radio,
  Select,
  Button,
  Row,
  Col,
  message,
  Checkbox,
} from "antd";
import { Link } from "react-router-dom";
import "./address.scss";
import { getCity, getState } from "../../../redux/action/settingAction";
import { ShoppingCartContext } from "../../../context";
import { useSelector } from "react-redux";
import Loading from "../../Loader/Loading";
import image from "../../../utils/helpers";

const { TextArea } = Input;
const { Option } = Select;

const Address = ({ loading }) => {
  const { addressData, setAddressData, handleStepChange, userLoading , checkoutaddress } =
    useContext(ShoppingCartContext);
  const { setting } = useSelector((state) => state.setting);
  const [form] = Form.useForm();
  const [showSenderAddress, setShowSenderAddress] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [blStates, setBlStates] = useState([]);
  const [blCities, setBlCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const occasions = setting.occasions || [];

  useEffect(() => {
    const initializeForm = async () => {
      try {
        setLoadingStates(true);

        // Load states first
        const statesResponse = await fetchStates();
        setStates(statesResponse);
        setBlStates(statesResponse);

        // Set initial form values
        const initialValues = {
          country: "101",
          bl_country: "101",
          address_type: addressData?.address_type || "home",
          same_as_shipping: addressData?.same_as_shipping ?? true,
          ...addressData,
          occation_id: addressData?.occation_id || undefined,
          state_id: addressData?.state_id
            ? parseInt(addressData.state_id)
            : undefined,
          city_id: addressData?.city_id
            ? parseInt(addressData.city_id)
            : undefined,
          bl_state_id: addressData?.bl_state_id
            ? parseInt(addressData.bl_state_id)
            : undefined,
          bl_city_id: addressData?.bl_city_id
            ? parseInt(addressData.bl_city_id)
            : undefined,
        };

        form.setFieldsValue(initialValues);
        setShowSenderAddress(!initialValues.same_as_shipping);

        // Load cities if state IDs exist
        if (addressData?.state_id) {
          setLoadingCities(true);
          await fetchCities(addressData.state_id, setCities);
          if (addressData.city_id) {
            form.setFieldValue("city_id", parseInt(addressData.city_id));
          }
        }

        if (addressData?.bl_state_id) {
          await fetchCities(addressData.bl_state_id, setBlCities);
          if (addressData.bl_city_id) {
            form.setFieldValue("bl_city_id", parseInt(addressData.bl_city_id));
          }
        }
      } catch (error) {
        console.error("Error initializing form:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    initializeForm();
  }, [form, addressData]);

  const onFinish = async (values) => {
    await form.validateFields();
    setAddressData(values);
    checkoutaddress(values)
    // handleStepChange(2);
  };

  const onReset = () => {
    form.resetFields();

    form.setFieldsValue({
      country: "101",
      bl_country: "101",
      address_type: "home",
    });
  };

  const fetchStates = () => {
    return new Promise((resolve) => {
      const sendData = { country_id: "101" };
      getState(sendData, null, (res) => {
        resolve(res);
      });
    });
  };

  const fetchCities = (stateId, setter) => {
    return new Promise((resolve) => {
      const sendData = { state_id: stateId };
      getCity(sendData, null, (res) => {
        setter(res);
        resolve();
      });
    }).finally(() => {
      if (setter === setCities) setLoadingCities(false);
    });
  };

  const handleStateChange = async (state_id) => {
    setLoadingCities(true);
    form.setFieldsValue({ city_id: undefined });
    await fetchCities(state_id, setCities);
  };

 

  return (
    <div className="address-wrapper">
      <Loading isLoading={userLoading || loadingStates}>
        <div className="address-form-wrapper">
          <h3>Add Delivery Address</h3>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              country: "101",
              bl_country: "101",
              address_type: "home",
            }}
          >
            {/* Receiver's Contact */}
            <SectionTitle title="Receiver's Contact" />
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="full_name"
                  rules={[
                    { required: true, message: "Please enter recipient name" },
                  ]}
                >
                  <Input placeholder="Recipient name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phone_number"
                  rules={[
                    { required: true, message: "Please enter mobile number" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter valid 10-digit mobile number",
                    },
                  ]}
                >
                  <Input placeholder="Recipient Mobile no." maxLength={10} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  rules={[
                    { type: "email", message: "Please enter valid email" },
                    { required: true, message: "Please enter email" },
                  ]}
                >
                  <Input placeholder="Recipient Email Address" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="alternet_phone_number"
                  rules={[
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter valid 10-digit mobile number",
                    },
                  ]}
                >
                  <Input
                    placeholder="Recipient Alt. Mobile no."
                    maxLength={10}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Receiver's Address */}
            <SectionTitle title="Receiver's Address" />
            <Row gutter={16}>
              {/* <Col xs={24} sm={12}>
              <Form.Item
                name="country"
                rules={[{ required: true, message: "Please select country" }]}
              >
                <Select disabled>
                  <Option value="101">India</Option>
                </Select>
              </Form.Item>
            </Col> */}
              <Col xs={24} sm={12}>
                <Form.Item
                  name="state_id"
                  rules={[{ required: true, message: "Please select state" }]}
                >
                  <Select
                    placeholder="Select State"
                    onChange={handleStateChange}
                    loading={loadingStates}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {states.map((state) => (
                      <Option key={state.id} value={state.id}>
                        {state.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="city_id"
                  loading={loadingCities}
                  rules={[{ required: true, message: "Please select city" }]}
                >
                  <Select
                    placeholder="Select City"
                    showSearch
                    loading={loadingCities}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {cities.map((city) => (
                      <Option key={city.id} value={city.id}>
                        {city.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="postal_code"
                  rules={[
                    { required: true, message: "Please enter pincode" },
                    {
                      pattern: /^[0-9]{6}$/,
                      message: "Please enter valid 6-digit pincode",
                    },
                  ]}
                >
                  <Input placeholder="Pincode" maxLength={6} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address_1"
              rules={[
                { required: true, message: "Please enter delivery address" },
              ]}
            >
              <TextArea
                rows={3}
                placeholder="Full delivery address with landmark"
              />
            </Form.Item>

            {/* Address Type */}
            <SectionTitle title="Address Type" />
            <Form.Item
              name="address_type"
              rules={[
                { required: true, message: "Please select address type" },
              ]}
            >
              <Radio.Group>
                <Radio value="Home">Home</Radio>
                <Radio value="Work">Work</Radio>
                <Radio value="Other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Occasion Select with Icon */}
            <Form.Item name="occation_id"  className="custom-occasion-select">
              <Select
                placeholder="Select Occasion"
                className="select_occasion_icon"
                value={addressData?.occation_id || undefined}
                suffixIcon={
                  <span style={{ fontSize: "18px" }} className="occasion_icon">
                    <img src={image["occasion_icon.png"]} />{" "}
                  </span>
                }
                style={{ width: "100%" }}
                allowClear
              >
                {occasions.map((item) => (
                  <Option key={item.id} value={item.id}>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      className="occasion_option_cls"
                    >
                     
                        {/* <img src= {image['occasion_icon.png']} />  */}
                     
                      {item.title}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Message on Card */}
            <Form.Item name="message_card">
              <TextArea
                rows={3}
                placeholder="Write your message here (max 200 characters)"
                maxLength={200}
                showCount
              />
            </Form.Item>

            {/* Sender's Address Toggle */}
            {/* <Form.Item name="same_as_shipping" valuePropName="checked">
              <Checkbox
                onChange={(e) => setShowSenderAddress(!e.target.checked)}
              >
                Sender details are same as recipient
              </Checkbox>
            </Form.Item> */}

            {/* {showSenderAddress && ( */}
            <>
              <SectionTitle title="Sender" />
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="bl_full_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Full Name",
                      },
                    ]}
                  >
                    <Input placeholder="Sender Full Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="bl_phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter mobile number",
                      },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Please enter valid 10-digit mobile number",
                      },
                    ]}
                  >
                    <Input placeholder="Sender Mobile no." maxLength={10} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="bl_email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                      },
                      { type: "email", message: "Please enter valid email" },
                    ]}
                  >
                    <Input placeholder="Sender Email" />
                  </Form.Item>
                </Col>

                {/* <Col xs={24} sm={12}>
                  <Form.Item
                    name="bl_country"
                    rules={[
                      { required: true, message: "Please select country" },
                    ]}
                  >
                    <Select disabled>
                      <Option value="101">India</Option>
                    </Select>
                  </Form.Item>
                </Col> */}

                {/* <Col xs={24} sm={12}>
                    <Form.Item
                      name="bl_state_id"
                      rules={[
                        { required: true, message: "Please select state" },
                      ]}
                    >
                      <Select
                        placeholder="Select State"
                        onChange={handleBlStateChange}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {blStates.map((state) => (
                          <Option key={state.id} value={state.id}>
                            {state.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="bl_city_id"
                      rules={[
                        { required: true, message: "Please select city" },
                      ]}
                    >
                      <Select
                        placeholder="Select City"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {blCities.map((city) => (
                          <Option key={city.id} value={city.id}>
                            {city.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="bl_postal_code"
                      rules={[
                        { required: true, message: "Please enter pincode" },
                        {
                          pattern: /^[0-9]{6}$/,
                          message: "Please enter valid 6-digit pincode",
                        },
                      ]}
                    >
                      <Input placeholder="Pincode" maxLength={6} />
                    </Form.Item>
                  </Col> */}
              </Row>

              {/* <Form.Item name="bl_address_1">
                  <TextArea rows={3} placeholder="Sender's complete address" />
                </Form.Item> */}
            </>
            {/* )} */}

            {/* Form Buttons */}
            <Form.Item>
              <div className="bottom-btn-group">
                <Button
                  className="cancel-btn"
                  onClick={onReset}
                  disabled={loading}
                >
                  Reset
                </Button>
                <Button
                  className="save-btn"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  {loading ? "Saving..." : "Save & Continue"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Loading>
    </div>
  );
};

const SectionTitle = ({ title }) => <p className="section-title">{title}</p>;

export default Address;
