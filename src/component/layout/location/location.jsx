import React, { useContext, useEffect, useState } from "react";
import "./location.scss";
import { Breadcrumb, Modal, Select } from "antd";
import image from "./../../../utils/helpers";
import { useSelector } from "react-redux";
import { MainContext } from "../../../context";
import BasicProvider from "../../../services/basicProvider";
import { API_ENDPOINTS } from "../../../config/endPoints";
import { useNavigate } from "react-router-dom";

const Location = ({ locationModal, setLocationModal }) => {
  const navigate = useNavigate();
  const { setting, loading } = useSelector((state) => state.setting);
  const { selectedCity, updateCity, selectedPincode, updatePincode } =
    useContext(MainContext);

  const [showcities, setShowCities] = useState(false);
  const [pincodeModalVisible, setPincodeModalVisible] = useState(false);

  const [pincodes, setPincodes] = useState([]);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  useEffect(() => {
    // Show pincode modal only if a city is selected and no pincode is chosen
    if (selectedCity && !selectedPincode) {
      setPincodeModalVisible(true);
      setLocationModal(false); // Hide city modal when pincode modal is active
    } else {
      setPincodeModalVisible(false);
    }
  }, [selectedCity, selectedPincode]);

  useEffect(() => {
    if (selectedCity) {
      setIsPincodeLoading(true);
      new BasicProvider(`${API_ENDPOINTS.pincodes_by_city}`, navigate)
        .postRequest({ selected_city: selectedCity?.id })
        .then((res) => {
          // Assuming the API returns pincodes in the format { value: '110001', label: '110001' }
          // If not, you may need to map the response, e.g.,
          // res.data.map(p => ({ value: p.pincode, label: p.pincode }))
          setPincodes(res.data || []);
        })
        .catch((err) => {
          console.error("Failed to fetch pincodes", err);
          setPincodes([]);
        })
        .finally(() => {
          setIsPincodeLoading(false);
        });
    }
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    updateCity(city);
  };

  const handlePincodeSelect = (pincode) => {
    const pincodeObject = pincodes.find((p) => p.value == pincode);

    console.log("pincodeObjectpincodeObject", pincodeObject);
    updatePincode(pincodeObject || { value: pincode, label: pincode });
    setLocationModal(false);
    setPincodeModalVisible(false);
  };

  const handleGoBackToCitySelect = () => {
    updateCity(null);
    updatePincode(null);
    setPincodeModalVisible(false);
    setLocationModal(true);
  };

  const handleclick = () => {
    setShowCities(!showcities);
  };

  const closeCityModal = () => {
    setLocationModal(false);
  };

  return (
    <>
      <Modal
        className="location-modal"
        centered
        open={locationModal && !pincodeModalVisible}
        onCancel={closeCityModal}
        footer={null}
        closable={!!selectedCity}
        maskClosable={!!selectedCity}
        width={{
          xs: "95%",
          sm: "95%",
          md: "90%",
          lg: "90%",
          xl: "60%",
          xxl: "50%",
        }}
      >
        <div className="model-content">
          <div className="top-title">
            <h2>Select city</h2>
            <h3>
              Enjoy Handpicked Gifts and Offers Personalized for your City
            </h3>
          </div>
          <div className="popular-city">
            <p>
              <span></span>Popular cities we deliver<span></span>
            </p>
            {loading ? (
              ""
            ) : (
              <ul>
                {setting?.popular_cities?.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className={selectedCity?.id === city.id ? "selected" : ""}
                  >
                    <img
                      src={city.icon || image["popular-city.png"]}
                      alt={city.name}
                      onError={(e) => {
                        e.target.src = image["popular-city.png"];
                      }}
                    />
                    <span> {city.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {showcities && (
            <div className="other-city">
              <p>
                <span></span>Other Cities<span></span>
              </p>
              {loading ? (
                ""
              ) : (
                <ul>
                  {setting?.other_cities?.map((city) => (
                    <li
                      key={city.id}
                      className={selectedCity?.id === city.id ? "selected" : ""}
                      onClick={() => handleCitySelect(city)}
                    >
                      <span>{city.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <a className="view-all-btn" onClick={() => handleclick()}>
            {showcities ? "Hide All Cities" : "View All Cities"}
          </a>
        </div>
      </Modal>

      {/* --- Improved Pincode Modal --- */}
      <Modal
        className="pincode-modal" // Use this class for specific styling
        open={pincodeModalVisible}
        centered
        footer={null}
        closable={false}
        maskClosable={false}
        width={{
          xs: "95%",
          sm: "95%",
          md: "450px",
        }}
      >
        <div className="model-content">
          <div className="top-title">
            <h2>Enter Your Pincode</h2>
            <h3>Select a pincode to see product availability</h3>
          </div>

          <div className="pincode-selection-area">
            <Breadcrumb>
              <Breadcrumb.Item
                onClick={handleGoBackToCitySelect}
                style={{ cursor: "pointer" }}
              >
                Change City
              </Breadcrumb.Item>
              <Breadcrumb.Item className="selected_city_breadcrumb">
                {selectedCity?.name}
              </Breadcrumb.Item>
            </Breadcrumb>

            <Select
              showSearch
              placeholder="Select or type your pincode"
              optionFilterProp="children"
              onChange={handlePincodeSelect}
              loading={isPincodeLoading}
              options={pincodes}
              value={selectedPincode}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Location;
