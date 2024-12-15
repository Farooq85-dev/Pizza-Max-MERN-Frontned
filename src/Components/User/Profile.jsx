import { Divider } from "antd";
import { useFormik } from "formik";
import { CiLock } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  userEmailSchema,
  userNameSchema,
  userPasswordChangeSchema,
} from "../../Schemas";
import Button from "../Button";
import Input from "../Input";

const AccountComp = () => {
  const {
    values: userNameValues,
    errors: userNameErrors,
    touched: userNameTouched,
    handleBlur: userNameHandleBlur,
    handleSubmit: userNameHandleSubmit,
    handleChange: userNameHandleChange,
  } = useFormik({
    initialValues: {
      userName: "",
    },
    validationSchema: userNameSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {
    values: userEmailValues,
    errors: userEmailErrors,
    touched: userEmailTouched,
    handleBlur: userEmailHandleBlur,
    handleSubmit: userEmailHandleSubmit,
    handleChange: userEmailHandleChange,
  } = useFormik({
    initialValues: {
      userEmail: "",
    },
    validationSchema: userEmailSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {
    values: userPasswordValues,
    errors: userPasswordErrors,
    touched: userPasswordTouched,
    handleBlur: userPasswordHandleBlur,
    handleSubmit: userPasswordHandleSubmit,
    handleChange: userPasswordHandleChange,
  } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: userPasswordChangeSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex flex-col">
      <div className="user-picture-container flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="left-side flex flex-col sm:flex-row justify-center items-center gap-4 ">
          <img
            className="rounded-full h-20 w-20 object-cover border"
            src="https://cdn.dribbble.com/users/21745538/avatars/normal/data?1723901494"
            alt="user-profile"
            loading="lazy"
          />
          <div>
            <h3 className="text-lg text-center sm:text-left font-medium">
              Profile Picture
            </h3>
            <p className="text-sm text-center sm:text-left">
              Only WEBP format under 10KB
            </p>
          </div>
        </div>
        <div className="right-side flex gap-4">
          <Button
            id="upload-pic-btn"
            name="upload-pic-btn"
            type="button"
            title="Upload Picture"
            className="bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-bold"
          />
          <Button
            id="delete-pic-btn"
            name="delete-pic-btn"
            type="button"
            title="Delete"
            className="bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-semibold"
          />
        </div>
      </div>
      <Divider />
      <form
        onSubmit={userNameHandleSubmit}
        className="user-name-container flex flex-col gap-2"
      >
        <Input
          id="userName"
          type="text"
          name="userName"
          label="Full Name"
          ariaLabel="userName"
          placeHolder="Enter full name"
          icon={<FaRegUserCircle size={18} />}
          value={userNameValues.userName}
          onBlur={userNameHandleBlur}
          onChange={userNameHandleChange}
        />
        {userNameErrors && userNameTouched.userName ? (
          <p className="text-base text-red-600">{userNameErrors.userName}</p>
        ) : null}
        <Button
          id="addUserName"
          name="addUserName"
          type="submit"
          title="Save Name"
          className="bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-semibold"
        />
      </form>
      <Divider />
      <form
        onSubmit={userEmailHandleSubmit}
        className="user-email-container flex flex-col justify-start gap-2"
      >
        <Input
          type="email"
          id="userEmail"
          name="userEmail"
          label="Email"
          ariaLabel="userEmail"
          placeHolder="Enter your email"
          icon={<MdEmail size={18} />}
          value={userEmailValues.userEmail}
          onBlur={userEmailHandleBlur}
          onChange={userEmailHandleChange}
        />
        {userEmailErrors && userEmailTouched.userEmail ? (
          <p className="text-base text-red-600">{userEmailErrors.userName}</p>
        ) : null}
        <Button
          id="addUserEmail"
          name="addUserEmail"
          type="submit"
          title="Save Email"
          className="bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-semibold"
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
          className="bg-scrollBarColor border rounded-md shadow-sm px-4 py-2 font-semibold"
        />
      </form>
      <Divider />
    </div>
  );
};

export default AccountComp;
