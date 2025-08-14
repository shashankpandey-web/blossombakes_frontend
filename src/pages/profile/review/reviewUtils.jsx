import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BasicProvider from "../../../services/basicProvider";
import { API_ENDPOINTS } from "../../../config/endPoints";
import { errorMsg, successMsg } from "../../../actions/customFn";

export const useReviewUtils = () => {
  const { guest_id, order_product_id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state",state)

  const product = state?.product;
  const order_id = state?.order_id;
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      errorMsg("You can upload maximum 5 images");
      return;
    }

    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    files.forEach((file) => {
      if (!file.type.match("image.*")) {
        errorMsg("Please select only image files");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        errorMsg("Image size should be less than 5MB");
        return;
      }

      newImages.push(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });

    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const submitReview = async () => {
    if (rating === 0) {
      errorMsg("Please select a rating");
      return;
    }

    if (!description.trim()) {
      errorMsg("Please enter a review description");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("guest_id", guest_id);
      formData.append("order_product_id", order_product_id);
      formData.append("rating", rating);
      formData.append("description", description);

      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await new BasicProvider(
        API_ENDPOINTS.addreview,
        navigate,
        true
      ).postRequest(formData);

      if (response?.status) {
        successMsg(response.message || "Review submitted successfully");
        navigate(-1); 
      } else {
        errorMsg(response.message || "Failed to submit review");
      }
    } catch (error) {
      errorMsg(error.message || "An error occurred while submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    rating,
    setRating,
    description,
    setDescription,
    imagePreviews,
    handleImageUpload,
    removeImage,
    submitReview,
    isSubmitting,
    product,
    order_id,
    navigate
  };
};
