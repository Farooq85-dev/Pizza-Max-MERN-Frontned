// Libraries Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Breadcrumb, message } from "antd";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { LuMessageSquareMore } from "react-icons/lu";
import { MdConfirmationNumber, MdEmail } from "react-icons/md";
import axios from "axios";

// Local Imports
import { useUser } from "../Context/User";
import { checkoutSchema } from "../Schemas";
import ButtonComp from "../Components/Button";
import Input from "../Components/Input";
import Result from "../Components/Result";
import Select from "../Components/SelectInput";
import TextArea from "../Components/TextAreaInput";
import Loader from "../Components/Loader";

const initialValues = {
  fullName: "",
  contactNumber: "+92",
  emailAddress: "",
  address: "",
  promoCode: "",
  specialMessage: "",
  deliveryPreference: 100,
};

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const price = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(price);
  }, [cartItems]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      if (!user) {
        return message.error("Please login to place order!");
      }
      const data = {
        userId: user?._id,
        ...values,
        subtotal,
        deliveryCharges: values.deliveryPreference,
        grandTotal: subtotal + values.deliveryPreference,
        products: cartItems,
      };

      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/order/place`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message || "Congratulation!");
        handleReset();
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
    <div className="mt-20">
      <Breadcrumb
        className="p-4 pb-0 sm:px-10 text-sm"
        items={[
          {
            title: "Home",
          },
          {
            title: "Checkout",
          },
        ]}
      />
      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:py-4 sm:px-10"
      >
        <div className="form-container">
          <div className="flex flex-col justify-start gap-4 bg-white shadow-md rounded-xl py-4 px-6">
            <Input
              id="fullName"
              name="fullName"
              label="Full Name"
              ariaLabel="fullName"
              type="text"
              icon={<FaRegUserCircle size={18} />}
              placeHolder="Enter full name."
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.fullName && errors.fullName ? (
              <p className="text-base text-red-600">{errors.fullName}</p>
            ) : null}
            <Input
              id="phone"
              name="contactNumber"
              label="Phone Number"
              ariaLabel="phone"
              icon={<FaRegUserCircle size={18} />}
              type="text"
              placeHolder="Enter phone number."
              value={values.contactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.contactNumber && errors.contactNumber ? (
              <p className="text-base text-red-600">{errors.contactNumber}</p>
            ) : null}
            <Input
              id="emailAddress"
              name="emailAddress"
              label="Email Address"
              ariaLabel="email"
              icon={<MdEmail size={18} />}
              type="email"
              placeHolder="Enter email."
              value={values.emailAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.emailAddress && errors.emailAddress ? (
              <p className="text-base text-red-600">{errors.emailAddress}</p>
            ) : null}
            <TextArea
              id="address"
              name="address"
              label="Address"
              ariaLabel="address"
              placeHolder="Enter your address."
              icon={<LuMessageSquareMore size={18} />}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address && errors.address ? (
              <p className="text-base text-red-600">{errors.address}</p>
            ) : null}
            <TextArea
              id="specialMessage"
              name="specialMessage"
              label="Special Message"
              ariaLabel="specialMessage"
              placeHolder="Like about allergy, sugar or delivery instructions etc."
              icon={<LuMessageSquareMore size={18} />}
              value={values.specialMessage}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.specialMessage && errors.specialMessage ? (
              <p className="text-base text-red-600">{errors.specialMessage}</p>
            ) : null}
            <Select
              name="deliveryPreference"
              label="Select Delivery Preference"
              options={[
                { value: 100, label: "Standard" },
                { value: 200, label: "Express" },
                { value: 250, label: "Same Day" },
              ]}
              value={values.deliveryPreference}
              onChange={setFieldValue}
              onBlur={handleBlur}
            />
            {touched.deliveryPreference && errors.deliveryPreference ? (
              <p className="text-base text-red-600">
                {errors.deliveryPreference}
              </p>
            ) : null}
          </div>
        </div>
        <div className="review-cart-container flex flex-col justify-start gap-4 py-4 px-6 rounded-xl shadow-md bg-white">
          <h1 className="textbase sm:text-lg font-semibold mb-2">
            Review Your Cart...
          </h1>
          {cartItems?.map((product) => (
            <div
              key={product?._id}
              className="review-cart-product flex flex-col sm:flex-row justify-start gap-4 border-t p-2 rounded-md"
            >
              <div className="left-side">
                <div className="product-image">
                  <LazyLoadImage
                    effect="blur"
                    className="rounded-md w-full h-full sm:h-32 sm:w-32 object-cover"
                    src={product?.image}
                    alt={product?.name}
                  />
                </div>
              </div>
              <div className="right-side flex flex-col justify-between gap-1">
                <div className="product-detail flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                  <h3 className="text-base sm:text-xl font-semibold">
                    {product?.name}
                  </h3>
                  <h4 className="text-base sm:text-lg font-normal">
                    x{product?.quantity}
                  </h4>
                </div>
                <div className="product-price flex justify-end sm:justify-start">
                  <h5 className="text-base font-bold text-btnColor rounded-md">
                    Rs {product?.price}
                  </h5>
                </div>
              </div>
            </div>
          ))}
          {cartItems?.length > 0 ? (
            <>
              <Link to="/">
                <span className="hover:text-red-600 underline flex justify-end">
                  +Add more items
                </span>
              </Link>
              <Input
                id="promoCode"
                name="promoCode"
                label="Promo Code"
                ariaLabel="promoCode"
                type="text"
                icon={<MdConfirmationNumber size={18} />}
                placeHolder="Enter Promo code."
                value={values.promoCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.promoCode && errors.promoCode ? (
                <p className="text-base text-red-600">{errors.promoCode}</p>
              ) : null}
              <div className="place-order-details-container flex flex-col gap-1 p-2 rounded-md bg-bodycolor">
                <div className="subtotal-container flex justify-between items-center w-full">
                  <h4 className="text-base font-medium">Subtotal</h4>
                  <h4 className="text-base font-medium">Rs: {subtotal}</h4>
                </div>
                <div className="delivery-container flex justify-between items-center w-full">
                  <h4 className="text-base font-medium">Delivery Charges</h4>
                  <h4 className="text-base font-medium">
                    Rs: {values.deliveryPreference}
                  </h4>
                </div>
                <div className="grandtotal-container flex justify-between items-center w-full">
                  <h4 className="text-base font-bold">Grand Total</h4>
                  <h4 className="text-base font-bold">
                    Rs: {subtotal + values.deliveryPreference}
                  </h4>
                </div>
                <ButtonComp
                  id="place-order-btn"
                  name="place-order-btn"
                  type="submit"
                  title={
                    isLoading ? <Loader width={20} height={3} /> : "Place Order"
                  }
                  disabled={isLoading ? true : false}
                  className={
                    "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base"
                  }
                />
              </div>
            </>
          ) : (
            <Result
              icon={<ImSpoonKnife size={50} />}
              text="Your cart is empty!"
              btnText="Add items"
              url={"/"}
              isBtn={true}
              className={
                "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base"
              }
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
