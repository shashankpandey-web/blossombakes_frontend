export const reactRatings = {
  edit: false,
  activeColor: "#FFAA00",
  isHalf: true,
};


export const successMsgStyle = {
  id: "",
  position: "top-center",
  loading: true,
  style: {
    padding: "12px 16px",
    margin: "16px",
    background: "#16a34a", // Vibrant green
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(22, 163, 74, 0.3)",
    width: "100%",
    maxWidth: "350px",
  },
  iconTheme: {
    primary: "#ffffff",
    secondary: "#22c55e", // Slightly brighter green
  },
};

export const errorMsgStyle = {
  id: "",
  position: "top-center",
  loading: true,
  style: {
    padding: "9px",
    background:
      "linear-gradient(321deg, rgb(255 0 0 / 86%) 34%, rgb(255 0 0) 68%, rgb(255 0 0) 82%)",
    color: "#fff",

    fontSize: "14px",
    fontWeight: "600",
       width: "100%",
    maxWidth: "350px",
  },
  iconTheme: {
    primary: "#FFF",
    secondary: "#ff0101",
  },
};


export const warningMsgStyle = {
  id: "",
  position: "top-center",
  loading: true,
  style: {
    padding: "9px",
    background:
      "linear-gradient(321deg, rgb(255 141 0 / 86%) 34%, rgb(255 153 0) 68%, rgb(255 165 0) 82%)",
    color: "#fff",

    fontSize: "14px",
    fontWeight: "600",
    width: "20%",
  },
  iconTheme: {
    primary: "#FFF",
    secondary: "#ff8201",
  },
};