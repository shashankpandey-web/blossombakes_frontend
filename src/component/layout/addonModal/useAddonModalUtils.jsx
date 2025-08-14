// src/component/AddonModal/addonModalUtils.js

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../config/endPoints";
import BasicProvider from "../../../services/basicProvider";
import { errorMsg } from "../../../actions/customFn";


export const useAddonModalUtils = (product, addonCategories, isVisible) => {
  const navigate = useNavigate();

  const [addonProducts, setAddonProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

   
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [selectedAddons, setSelectedAddons] = useState([]);

  // Set the initial active tab
  useEffect(() => {
    
    if (isVisible && addonCategories?.length > 0 && !activeCategory) {
      setActiveCategory(addonCategories[0].id);
    }
  }, [isVisible, addonCategories, activeCategory]);

  // Fetch addon products for the active category
  const fetchAddonProducts = useCallback(async () => {
    if (!activeCategory || !product?.slug) return;
    setLoading(true);
    setError(null);
    try {
      const provider = new BasicProvider(API_ENDPOINTS.get_product_addons, navigate, true, false, { useMinDelay: true });
      const response = await provider.postRequest({
        product_slug: product.slug,
        addon_id: activeCategory,
      });
      if (response?.status) {
        setAddonProducts(response.data || []);
      } else {
        setError("Could not load addons for this category.");
        errorMsg(response.message || "Failed to fetch addons.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      errorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [activeCategory, product?.slug, navigate]);

  useEffect(() => {
    fetchAddonProducts();
  }, [fetchAddonProducts]);

  const handleTabChange = (key) => {
    setActiveCategory(key);
  };

  // --- NEW: Handler to add an item to the selection with quantity 1 ---
  const handleAddAddon = useCallback((addonProduct) => {
    setSelectedAddons((prev) => [
      ...prev,
      { ...addonProduct, quantity: 1 }, // Add with default quantity 1
    ]);
  }, []);

  // --- NEW: Handler to update quantity, or remove if quantity is 0 or less ---
  const handleUpdateAddonQuantity = useCallback((addonProductId, newQuantity) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item from the selection
      setSelectedAddons((prev) => prev.filter((item) => item.id !== addonProductId));
    } else {
      // Otherwise, update the quantity of the specific item
      setSelectedAddons((prev) =>
        prev.map((item) =>
          item.id === addonProductId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);


  return {
    loading,
    error,
    activeCategory,
    addonProducts,
    selectedAddons,
    handleTabChange,
    handleAddAddon, // Export new handler
    handleUpdateAddonQuantity, // Export new handler
  };
};