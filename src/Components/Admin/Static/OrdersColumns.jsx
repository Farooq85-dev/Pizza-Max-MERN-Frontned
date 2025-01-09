// Libararies Imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { message, Skeleton, Space, Tag } from "antd";
import { IoIosDocument } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";

// Local Imports
import Button from "../../Button";
import Modal from "../../Modal";
import Loader from "../../Loader";
import Select from "../../SelectInput.jsx";
import { dateTimeFormatter } from "../../../Constatns/index.js";

const ViewDetailsContent = React.memo(({ orderDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      status: orderDetails?.status,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `${import.meta.env?.VITE_API_URI}/order/admin/order/${
            orderDetails?._id
          }`,
          { status: values?.status },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message);
        setIsLoading(false);
      } catch (error) {
        message.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col jusify-start gap-2">
      <div className="review-cart-product flex flex-col justify-center gap-2">
        {orderDetails?.products?.map((product) => (
          <div key={product?.name} className="border-t p-2 rounded-md">
            <div className="left-side">
              <LazyLoadImage
                effect="blur"
                className="rounded-md w-full h-full sm:h-20 sm:w-20 object-cover"
                src={product?.image}
                alt={product?.name}
              />
            </div>
            <div className="right-side flex flex-col justify-between gap-1">
              <h3 className="text-base sm:text-xl font-semibold">
                {product?.name}
              </h3>
              <h4 className="text-base sm:text-lg font-normal">
                x{product?.quantity}
              </h4>
              <h5 className="text-base font-bold text-btnColor rounded-md">
                Rs {product?.price?.toFixed(2)}
              </h5>
            </div>
          </div>
        ))}
      </div>
      <div className="special-mezssage-contianer">
        <h3 className="text-base sm:text-xl font-semibold">Special Message</h3>
        <p className="text-base sm:text-lg">
          {orderDetails?.specialMessage || "N/A"}
        </p>
      </div>
      <div className="delivery-address-contianer">
        <h3 className="text-base sm:text-xl font-semibold">Delivery Address</h3>
        <p className="text-base sm:text-lg">{orderDetails?.address}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Select
          name="status"
          label="Change Order Status"
          options={[
            { value: "pending", label: "Pending" },
            { value: "delivered", label: "Delivered" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          value={values.status}
          onChange={setFieldValue}
          onBlur={handleBlur}
        />
        <Button
          id="delivery-status-confirm-btn"
          type="submit"
          name="delivery-status-confirm-btn"
          title={
            isLoading ? <Loader width={20} height={3} /> : "Update Order Status"
          }
          disabled={isLoading ? true : false}
          className={
            "border-2 border-navbarColor bg-navbarColor rounded-md px-2 py-1 font-semibold text-white text-base"
          }
        />
      </form>
    </div>
  );
});

ViewDetailsContent.propTypes = {
  orderDetails: PropTypes.shape({
    status: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    specialMessage: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const ViewDetails = React.memo(({ id }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => setModalVisible(!isModalVisible);

  useEffect(() => {
    const fetchOrderById = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env?.VITE_API_URI}/order/admin/order/${id}`,
          { withCredentials: true }
        );
        setOrderDetails(response?.data?.order || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (isModalVisible) fetchOrderById();
  }, [id, isModalVisible]);

  return (
    <>
      <Button
        title="View"
        icon={<IoIosDocument size={18} />}
        name="view-details-btn"
        type="button"
        id="view-details-btn"
        className="font-semibold text-red-600 text-base"
        onClick={toggleModal}
      />
      <Modal
        isConfirm={false}
        isVisible={isModalVisible}
        onClose={toggleModal}
        title="View And Edit Details"
        content={
          loading ? (
            <Skeleton active />
          ) : (
            <ViewDetailsContent orderDetails={orderDetails} />
          )
        }
      />
    </>
  );
});

ViewDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

const OrdersColumns = [
  {
    title: "Full Name",
    align: "center",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Contact Number",
    align: "center",
    dataIndex: "contactNumber",
    key: "contactNumber",
  },
  {
    title: "Email Address",
    align: "center",
    dataIndex: "emailAddress",
    key: "emailAddress",
  },
  {
    title: "Promo Code",
    align: "center",
    dataIndex: "promoCode",
    key: "promoCode",
    render: (code) => code || "N/A",
  },
  {
    title: "Delivery Preference",
    align: "center",
    dataIndex: "deliveryPreference",
    key: "deliveryPreference",
    render: (deliveryPreference) => `${deliveryPreference.toUpperCase()}`,
  },
  {
    title: "Subtotal",
    align: "center",
    dataIndex: "subtotal",
    key: "subtotal",
    render: (subtotal) => `Rs ${subtotal.toFixed(2)}`,
  },
  {
    title: "Grand Total",
    align: "center",
    dataIndex: "grandTotal",
    key: "grandTotal",
    render: (total) => `Rs ${total.toFixed(2)}`,
  },
  {
    title: "Status",
    align: "center",
    dataIndex: "status",
    key: "status",
    render: (status, { _id }) => {
      let color = "blue";
      if (status === "pending") color = "orange";
      else if (status === "delivered") color = "green";
      else if (status === "cancelled") color = "red";

      return (
        <Tag key={_id} color={color}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Order Date",
    align: "center",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => dateTimeFormatter.format(new Date(date)),
  },
  {
    title: "View Details",
    align: "center",
    key: "view-details",
    render: ({ _id }) => (
      <Space size="middle">
        <ViewDetails id={_id} />
      </Space>
    ),
  },
];

export { OrdersColumns, ViewDetails };
