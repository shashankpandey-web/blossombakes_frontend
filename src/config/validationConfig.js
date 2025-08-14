import * as Yup from "yup";
import constants from "./constant";

// \\\\\\\\\\\\\SignIN Validation Start
export const validateEmailOrPhone = (value) => {
  const phoneRegex = /^[0-9]+$/;
  if (phoneRegex.test(value)) {
    return "phone";
  } else {
    return "email";
  }
};
export const signInvalidationSchema = Yup.object({
  email: Yup.string().test("is-email-or-phone", function (value) {
    const trimmedValue = value?.trim() || "";
    const type = validateEmailOrPhone(value);
    if (!trimmedValue) {
      return this.createError({
        message: "Email or phone number is required",
      });
    }
    if (type === "phone") {
      if (!/^[0-9]{10}$/.test(trimmedValue)) {
        return this.createError({
          message: "Phone number must be 10 digits",
        });
      }
      return true;
    }
    if (type === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        return this.createError({
          message: "Invalid email format",
        });
      }
      return true;
    }
    return this.createError({
      message: "Invalid email or phone number",
    });
  }),
});
// \\\\\\\\\\\\\SignIN Validation Stop

// \\\\\\\\\\\\\SignUp Validation Start
export const signUpValidationSchema = Yup.object({
  name: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters"),
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name must contain only letters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
// \\\\\\\\\\\\\SignUp Validation End

// \\\\\\\\\\\\\User Profile Update Validation Start
export const profileUpdateValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters"),
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name must contain only letters"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  current_password: Yup.string().when("change_password", {
    is: (value) => value === true,
    then: (s) =>
      s
        .required("Current password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        ),
    otherwise: (s) => s.notRequired(),
  }),
  new_password: Yup.string().when("change_password", {
    is: (value) => value === true,
    then: (s) =>
      s
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        ),
    otherwise: (s) => s.notRequired(),
  }),
  confirm_password: Yup.string().when("change_password", {
    is: (value) => value === true,
    then: (s) =>
      s
        .required("Confirm password is required")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    otherwise: (s) => s.notRequired(),
  }),
});
// \\\\\\\\\\\\\User Profile Update Validation End

// \\\\\\\\\\\\\Manually Prescription  Validation Start
export const manuallyPrescriptionvalidationSchema = Yup.object({
  od_right_sph: Yup.string(),
  od_right_cyl: Yup.string(),
  od_right_axis: Yup.string().when("od_right_cyl", {
    is: (cyl) => !!cyl,
    then: (s) => s.required("Right AXIS is required if CYL is provided"),
  }),
  od_right_add: Yup.string(),
  os_left_sph: Yup.string(),
  os_left_cyl: Yup.string(),
  os_left_axis: Yup.string().when("os_left_cyl", {
    is: (cyl) => !!cyl,
    then: (s) => s.required("Left AXIS is required if CYL is provided"),
  }),
  os_left_add: Yup.string(),
  prescription_file: Yup.mixed()
    .test("fileType", "Only JPG, PNG, or PDF files are allowed", (value) => {
      if (!value) return true;
      const validTypes = constants?.SUPPORTED_FORMATS_FILE;
      return validTypes.includes(value.type);
    })
    .test(
      "fileSize",
      `File size must be less than ${constants?.prescription_file_size_mb}MB`,
      (value) => {
        if (!value) return true;
        return (
          value.size <=
          constants?.prescription_file_size_mb *
            constants?.prescription_file_size_bytes
        );
      }
    ),
});
// \\\\\\\\\\\\\Manually Prescription  Validation End

// \\\\\\\\\\\\\File Prescription  Validation Start
export const filePrescriptionvalidationSchema = Yup.object({
  prescription_file: Yup.mixed()
      .required("File is required")
    .test("fileType", "Only JPG, PNG, or PDF files are allowed", (value) => {
      if (!value) return true;
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      return validTypes.includes(value.type);
    })
    .test(
      "fileSize",
      `File size must be less than ${constants?.prescription_file_size_mb}MB`,
      (value) => {
        if (!value) return true;
        return (
          value.size <=
          constants?.prescription_file_size_mb *
            constants?.prescription_file_size_bytes
        );
      }
    ),
});
// \\\\\\\\\\\\\File Prescription  Validation End

// \\\\\\\\\\\\\CheckOut  Validation Start
export const checkOutvalidationSchema = Yup.object().shape({
  first_name: Yup.string()
    // .matches(/^[A-Za-z]+$/, "First name must only contain letters")
    .matches(/^[A-Za-z\s]+$/, "First name must only contain letters")
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),

  last_name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name must only contain letters")
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),

  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must not exceed 10 digits"),

  address: Yup.string().required("Address is required"),

  address_second: Yup.string().required("Address is required"),
  area: Yup.string().required("Area is required"),

  email: Yup.string().required("Email is required").email("Email is invalid"),

  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{4,6}$/, "Pincode must be 4 to 6 digits"),

    
    state: Yup.string()
    .required("State is required")
    .test("not-nan", "State is required", (value) => value != "NaN"),
    
    city: Yup.string()
      .required("City is required")
      .test("not-nan", "City is required", (value) => value != "NaN"),
  country: Yup.string().required("Country is required"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Prefer not to say"], "Invalid gender option"),

  same_as_shipping: Yup.boolean().required("This field is required"),

  address_type: Yup.string()
    .required("Address type is required")
    .oneOf(["Home", "Work", "Other"], "Invalid address type"),

  bl_first_name: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) =>
      s
        .required("Billing first name is required")
        .min(2, "Billing first name must be at least 2 characters")
        .max(50, "Billing first name must not exceed 50 characters"),
  }),
  bl_last_name: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) =>
      s
        .required("Billing last name is required")
        .min(2, "Billing last name must be at least 2 characters")
        .max(50, "Billing last name must not exceed 50 characters"),
  }),
  bl_address_second: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) => s.required("Billing First address is required"),
  }),
  bl_address_first: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) => s.required("Billing Secont address is required"),
  }),
  bl_email: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) =>
      s.required("Billing email is required").email("Billing email is invalid"),
  }),
  bl_phone_number: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) =>
      s
        .required("Billing phone number is required")
        .matches(/^[0-9]+$/, "Billing phone number must contain only digits")
        .min(10, "Billing phone number must be at least 10 digits")
        .max(15, "Billing phone number must not exceed 15 digits"),
  }),

  bl_pincode: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) =>
      s
        .required("Billing pincode is required")
        .matches(/^\d{4,6}$/, "Billing pincode must be 4 to 6 digits"),
  }),

  bl_city: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) =>
      s
        .required("Billing city is required")
        .test(
          "not-nan",
          "Billing city is required",
          (value) => value && value !== "NaN"
        ),
  }),

  bl_state: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) =>
      s
        .required("Billing state is required")
        .test(
          "not-nan",
          "Billing state is required",
          (value) => value && value !== "NaN"
        ),
  }),

  bl_country: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) => s.required("Billing country is required"),
  }),
  agree: Yup.boolean().oneOf(
    [true],
    "You must agree to the Terms of Use & Privacy Policy"
  ),

  bl_area: Yup.string().when("same_as_shipping", {
    is: false,
    then: (s) => s.required("Area is required"),
  }),
});
// \\\\\\\\\\\\\CheckOut  Validation End

// \\\\\\\\\\\\\Return Order  Validation Start
export const returnOrderVaidation = Yup.object().shape({
  order_id: Yup.string().required("Order ID is required"),
  // product_id: Yup.string().required("Product ID is required"),
  reason_title: Yup.string().required("Reason title is required"),
  comment: Yup.string().required("Comment is required"),
  images: Yup.array()
    .of(
      Yup.mixed().test(
        "fileType",
        "Only PNG, JPG, and JPEG files are allowed",
        (value) => {
          if (!value) return true;
          return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
        }
      )
    )
    .min(1, "At least one image is required"),
  refund_type: Yup.string()
    .oneOf(["credit_point", "refund"], "Invalid refund type")
    .required("Refund type is required"),
});
// \\\\\\\\\\\\\ChReturn OrdereckOut  Validation END

// \\\\\\\\\\\\\Warranty Order  Validation Start
export const warrantyOrderVaidation = Yup.object().shape({
  order_id: Yup.string().required("Order ID is required"),
  product_id: Yup.string().required("Product ID is required"),
  reason_title: Yup.string().required("Reason title is required"),
  comment: Yup.string().required("Comment is required"),
  images: Yup.array()
    .of(
      Yup.mixed().test(
        "fileType",
        "Only PNG, JPG, and JPEG files are allowed",
        (value) => {
          if (!value) return true;
          return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
        }
      )
    )
    .min(1, "At least one image is required"),
  issue_type: Yup.string()
    .oneOf(["frame", "lense"], "Invalid issue type")
    .required("Issue type is required"),
});
// \\\\\\\\\\\\\Warranty OrdereckOut  Validation END
