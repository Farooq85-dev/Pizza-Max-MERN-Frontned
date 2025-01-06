// Libraries Imports
import { useState } from "react";
import { Divider, message } from "antd";
import { useFormik } from "formik";
import { CiLock } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";

// Local Imports
import { useUser } from "../../Context/User.context";
import Input from "../Input";
import UploaderComp from "../FileInput";
import Button from "../Button";
import {
  userEmailSchema,
  userNameSchema,
  userPasswordChangeSchema,
} from "../../Schemas";

const AdminAccountComp = () => {
  const { user } = useUser();

  const {
    values: userNameValues,
    errors: userNameErrors,
    touched: userNameTouched,
    handleBlur: userNameHandleBlur,
    handleSubmit: userNameHandleSubmit,
    handleChange: userNameHandleChange,
    handleReset: userNameHandleReset,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: userNameSchema,
    onSubmit: async (userNameValues) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URI}/user/name`,
          userNameValues,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message || "Congratulation!");
        userNameHandleReset();
      } catch (error) {
        message.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      }
    },
  });

  const {
    values: userEmailValues,
    errors: userEmailErrors,
    touched: userEmailTouched,
    handleBlur: userEmailHandleBlur,
    handleSubmit: userEmailHandleSubmit,
    handleChange: userEmailHandleChange,
    handleReset: userEmailHandleReset,
  } = useFormik({
    initialValues: {
      secondaryEmail: "",
    },
    validationSchema: userEmailSchema,
    onSubmit: async (userEmailValues) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/user/email`,
          userEmailValues,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message || "Congratulation!");
        userEmailHandleReset();
      } catch (error) {
        message.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      }
    },
  });

  const {
    values: userPasswordValues,
    errors: userPasswordErrors,
    touched: userPasswordTouched,
    handleBlur: userPasswordHandleBlur,
    handleSubmit: userPasswordHandleSubmit,
    handleChange: userPasswordHandleChange,
    handleReset: userPasswordHandleReset,
  } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: userPasswordChangeSchema,
    onSubmit: async (userPasswordValues) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URI}/user/password`,
          userPasswordValues,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message || "Congratulation!");
        userPasswordHandleReset();
      } catch (error) {
        message.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      }
    },
  });

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files;
    setFile(uploadedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      return message.error("Please provide a file!");
    }

    if (file.length > 1) {
      return message.error("Please provide a single file!");
    }

    if (file[0].type !== "image/webp") {
      return message.error("File must be in WEBP Foramt!");
    }

    // if (file[0].size > 100000) {
    //   return message.error("File must be lower than 100 KB!");
    // }

    let data = new FormData();
    data.append("userAvatar", file[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/user/avatar/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/formData",
          },
          withCredentials: true,
        }
      );
      message.success(response?.data?.message || "Congratulation!");
      setFile(null);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env?.VITE_API_URI}/user/avatar`,
        { avatarPublicId: user?.avatar },
        {
          withCredentials: true,
        }
      );
      message.success(response?.data?.message || "Congratulations!");
    } catch (error) {
      message.success(
        error?.response?.data?.message || "Something went wrong!"
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="user-picture-container flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div className="left-side flex flex-col sm:flex-row justify-center items-center gap-4 ">
          <UploaderComp handleChange={handleFileChange} />
        </div>
        <div className="right-side flex gap-4">
          <Button
            id="upload-pic-btn"
            name="upload-pic-btn"
            type="button"
            title="Upload Picture"
            className="bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-bold"
            onClick={handleFileUpload}
          />
          <Button
            id="delete-pic-btn"
            name="delete-pic-btn"
            type="button"
            title="Delete"
            className="bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-semibold"
            onClick={handleDeleteAvatar}
          />
        </div>
      </div>
      <Divider />
      <form
        onSubmit={userNameHandleSubmit}
        className="user-name-container flex flex-col gap-2"
      >
        <Input
          id="name"
          type="text"
          name="name"
          label="Full Name"
          ariaLabel="name"
          placeHolder="Enter full name"
          icon={<FaRegUserCircle size={18} />}
          value={userNameValues.name}
          onBlur={userNameHandleBlur}
          onChange={userNameHandleChange}
        />
        {userNameErrors && userNameTouched.name ? (
          <p className="text-base text-red-600">{userNameErrors.name}</p>
        ) : null}
        <Button
          id="addUserName"
          name="addUserName"
          type="submit"
          title="Save Name"
          className="sm:w-[30%] md:w-[20%] bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-semibold"
        />
      </form>
      <Divider />
      <form
        onSubmit={userEmailHandleSubmit}
        className="user-email-container flex flex-col justify-start gap-2"
      >
        <Input
          type="email"
          id="secondaryEmail"
          name="secondaryEmail"
          label="Email"
          ariaLabel="secondaryEmail"
          placeHolder="Enter another email"
          icon={<MdEmail size={18} />}
          value={userEmailValues.secondaryEmail}
          onBlur={userEmailHandleBlur}
          onChange={userEmailHandleChange}
        />
        {userEmailErrors && userEmailTouched.secondaryEmail ? (
          <p className="text-base text-red-600">
            {userEmailErrors.secondaryEmail}
          </p>
        ) : null}
        <Button
          id="addUserEmail"
          name="addUserEmail"
          type="submit"
          title="Save Email"
          className="sm:w-[30%] md:w-[20%] bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-semibold"
        />
      </form>
      <Divider />
      <form
        onSubmit={userPasswordHandleSubmit}
        className="user-password-container flex flex-col justify-start gap-2"
      >
        <Input
          type="password"
          id="currentPassword"
          name="currentPassword"
          label="Current Password"
          ariaLabel="userCurrentPassword"
          placeHolder="Enter current password"
          icon={<CiLock size={18} />}
          value={userPasswordValues.currentPassword}
          onBlur={userPasswordHandleBlur}
          onChange={userPasswordHandleChange}
        />
        {userPasswordErrors && userPasswordTouched.currentPassword ? (
          <p className="text-base text-red-600">
            {userPasswordErrors.currentPassword}
          </p>
        ) : null}
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          label="New Password"
          ariaLabel="userNewPassword"
          placeHolder="Enter new password"
          icon={<CiLock size={18} />}
          value={userPasswordValues.newPassword}
          onBlur={userPasswordHandleBlur}
          onChange={userPasswordHandleChange}
        />
        {userPasswordErrors && userPasswordTouched.newPassword ? (
          <p className="text-base text-red-600">
            {userPasswordErrors.newPassword}
          </p>
        ) : null}
        <Button
          id="changePassword"
          name="changePassword"
          type="submit"
          title="Change Password"
          className="sm:w-[30%] md:w-[20%] bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-semibold"
        />
      </form>
      <Divider />
    </div>
  );
};

export default AdminAccountComp;
