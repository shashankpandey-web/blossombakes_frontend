import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MainContext } from ".";
const MainProvider = ({ children }) => {
  const [loginModal, setLoginModal] = useState(false);
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState(() => {
    return JSON.parse(localStorage.getItem("_blossom_selectedCity")) || null;
  });

  const [selectedPincode, setSelectedPincode] = useState(() => {
    try {
      const saved = localStorage.getItem("_blossom_selectedPincode");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Invalid JSON in localStorage for _blossom_selectedPincode", e);
      return null;
    }
  });

  const updateCity = (city) => {
    setSelectedCity(city);
    localStorage.setItem("_blossom_selectedCity", JSON.stringify(city));
    setSelectedPincode(null);
    localStorage.removeItem("_blossom_selectedPincode");
  };

  const updatePincode = (pincode) => {
    setSelectedPincode(pincode);
    localStorage.setItem("_blossom_selectedPincode", JSON.stringify(pincode));
  };

  return (
    <MainContext.Provider
      value={{ loginModal, setLoginModal, selectedCity, updateCity , selectedPincode,updatePincode }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
