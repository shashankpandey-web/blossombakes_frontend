import toast from "react-hot-toast";
import { errorMsgStyle, successMsgStyle, warningMsgStyle } from "../config/initialConfig";
import Swal from "sweetalert2";




export const warningMsg = async (msg) => {
  toast.dismiss();
  toast.success(msg, warningMsgStyle);
};

//   Show Success message
export const successMsg = async (msg) => {
  console.log("msgmsg",msg)
  const loadingToast = toast.loading("Loading...", successMsgStyle);
  successMsgStyle.id = loadingToast;

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  toast.success(msg, successMsgStyle);
};

// Show error message
export const errorMsg = async (msg) => {
  const loadingToast = toast.loading("Loading...", errorMsgStyle);
  errorMsgStyle.id = loadingToast;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  toast.error(msg, errorMsgStyle);
};

export const handleCatchErrors = (error, navigate, rejectWithValue, path) => {
  if (error.code === "ERR_NETWORK") {
    if (rejectWithValue) {
      navigate("/something-went-wrong");
      return rejectWithValue(error.message);
    }
  } else {
    // console.log("error.response",error)
    if (error.response !== undefined) {
      const { status, data } = error.response;
      if (error.response !== undefined) {
        if (status === 401) {
          
          localStorage.removeItem(`${import.meta.env.VITE_APP_STORAGE_NAME}`);
          localStorage.removeItem(`${import.meta.env.VITE_APP_STORAGE_NAME}`);

          if (path === "inquiry") {
            errorMsg("User Unauthorized");
            navigate("/");
          } else if (path !== "") {
            navigate(path);
          } else {
            navigate(path !== undefined ? path : "/");
          }
        } else if (status === 402) {
          if (data.message) {
            errorMsg(data.message);
          }
        } else if (status === 400 || status === 404 || status === 422) {
          if (data.message) {
            errorMsg(data.message);
          }
        } else if (status === 500) {
          if (data.message) {
            errorMsg(data.message);
          }
        } else if (status === 401) {
          if (data.message) {
            errorMsg(data.message);
          }
        } else {
          navigate("/something-went-wrong");
        }
      }
    }
  }
};


export const checkLogin = () => {
  var status = false;
  if (localStorage.getItem(`${process.env.REACT_APP_LOCAL_TOKEN_NAME}`) != null) {
    status = true;
  }
  return status;
};


export const getHeader = () => {
  const config = {
    headers: {
      authorization: localStorage.getItem(`${process.env.REACT_APP_LOCAL_TOKEN_NAME}`),
    },
  };
  return config;
};


export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const showConfirmation = ({ message, title = "Are you sure?", onConfirm }) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0d3b65",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((res) => {
    if (res.isConfirmed) {
      onConfirm(); // Call the function passed as a callback when confirmed
    }
  });
};





export const getMostViewed = () => {
  try {
    const mostViewed = localStorage.getItem('mostViewed');
    return mostViewed ? JSON.parse(mostViewed) : [];
  } catch (error) {
    console.error('Error reading mostViewed from localStorage:', error);
    return [];
  }
};

export const addToMostViewed = (productId) => {
  try {
    let mostViewed = getMostViewed();
    
    mostViewed = mostViewed.filter(id => id !== productId);

    mostViewed.unshift(productId);
    
    // Keep only the latest 20
    mostViewed = mostViewed.slice(0, 20);
    
    localStorage.setItem('mostViewed', JSON.stringify(mostViewed));
  } catch (error) {
    console.error('Error updating mostViewed in localStorage:', error);
  }
};