import axios from "axios";

const ReactAppUrl = "https://blossombakes.infosparkles.com/admin/api";
// const ReactAppUrl = "https://blossombakes.co.in/admin/api";
const instance = axios.create({ baseURL: ReactAppUrl });

// Set default headers
instance.defaults.headers.common["Content-Type"] = "multipart/form-data";

// Request interceptor
instance.interceptors.request.use((config) => {
  const guestId = localStorage.getItem("BLOSSOMBAKES_LOCAL_ID");
  const selectedCity = parseSafely("_blossom_selectedCity");
  const selectedPincode = parseSafely("_blossom_selectedPincode");
  const accessToken = localStorage.getItem(
    `${import.meta.env.VITE_APP_STORAGE_NAME}`
  );

  // Add guest_id to request data
  if (config.method == "post") {
    if (config.data instanceof FormData) {
      config.data.append("guest_id", guestId);
      config.data.append("selected_city", selectedCity?.id ?? "");
      config.data.append("selected_pincode", selectedPincode?.value ?? "");
    } else {
      config.data = {
        ...(config.data || {}),
        guest_id: guestId,
        selected_city: selectedCity?.id,
        selected_pincode: selectedPincode?.value,
      };
    }
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

function parseSafely(key, fallback = {}) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return fallback;
  }
}

export default instance;
