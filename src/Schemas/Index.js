import * as yup from "yup";

export const userRegisterationSchema = yup.object({
  name: yup.string().required("Please Enter Name!"),
  email: yup.string().email().required("Please Enter Email!"),
  password: yup
    .string()
    .min(8)
    .max(12)
    .required("Password must be at least 8 to 12 characters long!"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Password doesn't Match!"),
});

export const userLoginSchema = yup.object({
  email: yup.string().email().required("Please Enter Email!"),
  password: yup
    .string()
    .min(8)
    .max(12)
    .required("Password must be at least 8 to 12 characters long!"),
});
