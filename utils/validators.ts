import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registrationSchema = Yup.object().shape({
  fullName: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  terms: Yup.boolean().oneOf([true], ""),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
});

export const buyAirtimeSchema = Yup.object().shape({
  amount: Yup.string().required(),
  phoneNumber: Yup.string().required(),
  serviceProvider: Yup.string().required(),
});

export const buyDataSchema = Yup.object().shape({
  phoneNumber: Yup.string().required(),
  serviceProvider: Yup.string().required(),
});

export const buyElectricitySchema = Yup.object().shape({
  amount: Yup.string().required(),
  meterNumber: Yup.string().required().length(11),
});

export const bettingSchema = Yup.object().shape({
  amount: Yup.string().required(),
  customerId: Yup.string().required(),
});

export const ninValidationSchema = Yup.object().shape({
  nin: Yup.string().required().length(11),
});

export const tierThreeSchema = Yup.object().shape({
  address: Yup.string().required(),
  city: Yup.string().required(),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, "Old Password must be at least 6 characters")
    .required("Old Password is required"),
  newPassword: Yup.string()
    .min(6, "New Password must be at least 6 characters")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
});

export const changePinSchema = Yup.object().shape({
  oldPin: Yup.string().length(4).required("Old pin is required"),
  newPin: Yup.string().length(4).required("Pin is required"),
  confirmPin: Yup.string()
    .required("Confirm Pin is required")
    .oneOf([Yup.ref("newPin"), ""], "Pins must match"),
});

export const bankTransferSchema = Yup.object().shape({
  accountNumber: Yup.string().required().length(10),
  amount: Yup.string().required(),
});

export const internalTransferSchema = Yup.object().shape({
  accountNumber: Yup.string().required().length(10),
  amount: Yup.string().required(),
});
