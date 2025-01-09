// Libraries Imports
import { useState } from "react";
import { message } from "antd";
import { useFormik } from "formik";
import { CiLock } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";

//  Local Imports
import { userLoginSchema, userRegisterationSchema } from "../Schemas";
import Button from "./Button";
import Input from "./Input";
import Loader from "./Loader";

const LoginRegisterComp = () => {
  const [formState, setFormState] = useState("Register");
  const [isLoading, setIsLoading] = useState(false);
  const registerInitialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    values: registerValues,
    errors: registerErrors,
    touched: registerTouched,
    handleChange: registerHandleChange,
    handleSubmit: registerHandleSubmit,
    handleBlur: registerHandleBlur,
    handleReset: registerHandleReset,
  } = useFormik({
    initialValues: registerInitialValues,
    validationSchema: userRegisterationSchema,
    onSubmit: async (registerValues) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/user/register`,
          registerValues,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message || "Congratulation!");
        registerHandleReset();
        setFormState("Login");
        setIsLoading(false);
      } catch (error) {
        message.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const {
    errors: loginErrors,
    values: loginValues,
    touched: LoginTouched,
    handleSubmit: loginHandleSubmit,
    handleChange: loginHandleChange,
    handleBlur: loginHandleBlur,
    handleReset: loginHandleReset,
  } = useFormik({
    initialValues: loginInitialValues,
    validationSchema: userLoginSchema,
    onSubmit: async (loginValues) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/user/login`,
          loginValues,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message || "Congratulation!");
        loginHandleReset();
        setIsLoading(false);
      } catch (error) {
        message.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {formState === "Register" && (
        <form
          onSubmit={registerHandleSubmit}
          className="flex flex-col justify-start gap-2 w-full"
        >
          <Input
            placeHolder={"Enter name."}
            id="name"
            name="name"
            label="Name"
            ariaLabel="name"
            type="text"
            value={registerValues.name}
            onChange={registerHandleChange}
            onBlur={registerHandleBlur}
            icon={<FaRegUserCircle size={18} />}
          />
          {registerErrors && registerTouched.name ? (
            <p className="text-base text-red-600">{registerErrors.name}</p>
          ) : null}
          <Input
            placeHolder={"Enter email."}
            id="email"
            name="email"
            label="Email"
            ariaLabel="email"
            type="email"
            value={registerValues.email}
            onChange={registerHandleChange}
            onBlur={registerHandleBlur}
            icon={<MdEmail size={18} />}
          />
          {registerErrors && registerTouched.email ? (
            <p className="text-base text-red-600">{registerErrors.email}</p>
          ) : null}
          <Input
            placeHolder={"Enter password."}
            id="password"
            name="password"
            label="Password"
            ariaLabel="password"
            type="password"
            value={registerValues.password}
            onChange={registerHandleChange}
            onBlur={registerHandleBlur}
            icon={<CiLock size={18} />}
          />
          {registerErrors && registerTouched.password ? (
            <p className="text-base text-red-600">{registerErrors.password}</p>
          ) : null}
          <Input
            placeHolder={"Enter password again."}
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            ariaLabel="confirmPassword"
            type="password"
            value={registerValues.confirmPassword}
            onChange={registerHandleChange}
            onBlur={registerHandleBlur}
            icon={<CiLock size={18} />}
          />
          {registerErrors && registerTouched.confirmPassword ? (
            <p className="text-base text-red-600">
              {registerErrors.confirmPassword}
            </p>
          ) : null}
          <Button
            className="border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-auto"
            title={isLoading ? <Loader width={20} height={3} /> : "Register"}
            disabled={isLoading ? true : false}
            id="register-btn"
            name="register-btn"
            type="submit"
          />
          <p className="flex justify-start items-center gap-1 text-base">
            {"Already have an account."}
            <Button
              title="Login Now"
              id="login-redirection-btn"
              name="login-redirection-btn"
              type="button"
              onClick={() => setFormState("Login")}
              className="underline decoration-red-600"
            />
          </p>
        </form>
      )}
      {formState === "Login" && (
        <form
          onSubmit={loginHandleSubmit}
          className="flex flex-col justify-start gap-2 w-full"
        >
          <Input
            placeHolder={"Enter email."}
            id="email"
            name="email"
            label="Email"
            ariaLabel="email"
            type="email"
            value={loginValues.email}
            onChange={loginHandleChange}
            onBlur={loginHandleBlur}
            icon={<MdEmail size={18} />}
          />
          {loginErrors && LoginTouched.email ? (
            <p className="text-base text-red-600">{loginErrors.email}</p>
          ) : null}
          <Input
            placeHolder={"Enter password."}
            id="password"
            name="password"
            label="Password"
            ariaLabel="password"
            type="password"
            value={loginValues.password}
            onChange={loginHandleChange}
            onBlur={loginHandleBlur}
            icon={<CiLock size={18} />}
          />
          {loginErrors && LoginTouched.password ? (
            <p className="text-base text-red-600">{loginErrors.password}</p>
          ) : null}
          <Button
            className="border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-auto"
            title={isLoading ? <Loader width={20} height={3} /> : "Login"}
            disabled={isLoading ? true : false}
            id="login-btn"
            name="login-btn"
            type="submit"
          />
          <p className="flex justify-start items-center gap-1 text-base">
            {"Don't have an account."}
            <Button
              title="Register Now"
              id="register-redirection-btn"
              name="register -redirection-btn"
              type="button"
              onClick={() => setFormState("Register")}
              className="underline decoration-red-600"
            />
          </p>
        </form>
      )}
    </>
  );
};

export default LoginRegisterComp;
