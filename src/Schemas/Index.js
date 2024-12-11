import * as yup from "yup";

export const userRegisterationSchema = yup.object({
  name: yup.string().required("Please Enter Name!"),
  email: yup.string().email().required("Please enter email!"),
  password: yup
    .string()
    .min(8)
    .max(12)
    .required("Password must be at least 8 to 12 characters long!"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Password doesn't match!"),
});

export const userLoginSchema = yup.object({
  email: yup.string().email().required("Please enter email!"),
  password: yup
    .string()
    .min(8)
    .max(12)
    .required("Password must be at least 8 to 12 characters long!"),
});

export const checkoutSchema = yup.object({
  fullName: yup.string().required("Please enter full name!"),
  phone: yup
    .string()
    .matches(
      /^\+92[0-9]{10}$/,
      "Phone number must follow +92XXXXXXXXXX format!"
    )
    .required("Please enter Phone Number!"),
  emailAddress: yup
    .string()
    .email("Invalid email!")
    .required("Email is required!"),
  address: yup.string().required("Please enter address!"),
  promoCode: yup.string().required("Please enter promo code!"),
});
