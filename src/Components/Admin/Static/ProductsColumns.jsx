// Libraries Imports
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, message, Space } from "antd";
import { useFormik } from "formik";
import { GiPriceTag, GiStockpiles } from "react-icons/gi";
import { MdDelete, MdModeEdit, MdOutlineDescription } from "react-icons/md";
import { SiNamecheap } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import axios from "axios";

// Local Imports
import Button from "../../Button.jsx";
import Input from "../../Input.jsx";
import Loader from "../../Loader.jsx";
import Modal from "../../Modal.jsx";
import PopupConfirm from "../../PopupConfirm.jsx";
import { dateTimeFormatter } from "../../../Constatns/index.js";

const ViewProductContent = React.memo(({ productDetails }) => {
  const initialValues = {
    name: productDetails?.name || "",
    description: productDetails?.description || "",
    price: productDetails?.price || "",
    stock: productDetails?.stock || "",
    categoryName: productDetails?.categoryName || "",
  };

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async () => {
      const data = {
        id: productDetails?._id,
        name: values.name || productDetails?.name,
        description: values.description || productDetails?.description,
        price: values.price || productDetails?.price,
        stock: values.stock || productDetails?.stock,
        categoryName: values.categoryName || productDetails?.categoryName,
      };

      try {
        const response = await axios.post(
          `${import.meta.env?.VITE_API_URI}/update-product-by-id`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message);
      } catch (error) {
        message.success(error?.response?.data?.message);
      }
    },
  });

  return (
    <div>
      <div className="view-edit-prodcut-details-conatiner flex flex justify-start gap-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start gap-2 w-full"
        >
          <Input
            placeHolder="Enter product name."
            id="name"
            name="name"
            label="Product Name"
            ariaLabel="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<SiNamecheap size={18} />}
          />
          <Input
            placeHolder="Enter product description."
            id="Product description"
            name="description"
            label="Description"
            ariaLabel="description"
            type="text"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<MdOutlineDescription size={18} />}
          />
          <Input
            placeHolder="Enter product price."
            id="price"
            name="price"
            label="Product Price"
            ariaLabel="price"
            type="number"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<GiPriceTag size={18} />}
          />
          <Input
            placeHolder="Enter product availability stock."
            id="stock"
            name="stock"
            label="Product Stock"
            ariaLabel="stock"
            type="number"
            value={values.stock}
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<GiStockpiles size={18} />}
          />
          <Input
            placeHolder="Enter product category name."
            id="categoryName"
            name="categoryName"
            label="Product Category Name"
            ariaLabel="categoryName"
            type="text"
            value={values.categoryName}
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<BiCategoryAlt size={18} />}
          />
          <p className="font-medium text-red-600">
            Note: If you leave any field empty then our system will
            automatically keep previous detail(s).
          </p>
          <Button
            className={
              "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-auto"
            }
            title="Confirm"
            id="confirm-product-details-btn"
            name="confirm-product-details-btn"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
});

ViewProductContent.propTypes = {
  productDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
  }).isRequired,
};

const EditProductDetailsComp = React.memo(({ id }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggelModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env?.VITE_API_URI}/get-product-by-id`,
          { id },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setProductDetails(response?.data?.product || []);
        message.success(response?.data?.message);
      } catch (error) {
        message.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    if (isModalVisible) fetchProductById();
  }, [id, isModalVisible]);

  return (
    <div>
      <Button
        title="Edit"
        id="edit-product-btn"
        name="edit-product-btn"
        type="button"
        className="font-semibold text-red-600 text-base"
        icon={<MdModeEdit />}
        onClick={handleToggelModal}
      />
      <Modal
        isConfirm={false}
        isVisible={isModalVisible}
        onClose={handleToggelModal}
        title="View and Edit Product Details"
        content={
          loading ? (
            <div className="p-4">
              <Loader width={30} height={0} />
            </div>
          ) : (
            <ViewProductContent productDetails={productDetails} />
          )
        }
      />
    </div>
  );
});

EditProductDetailsComp.propTypes = {
  id: PropTypes.string.isRequired,
};

const handleDeleteProduct = async (id) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/delete-product`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    message.success(response?.data?.message);
  } catch (error) {
    message.error(error?.response?.data?.message);
  }
};

const ProductsColumns = [
  {
    title: "Image",
    align: "center",
    dataIndex: "image",
    key: "image",
    render: (image, { name }) => <Avatar src={image} size="large" alt={name} />,
  },
  { title: "Name", align: "center", dataIndex: "name", key: "name" },
  { title: "Price", align: "center", dataIndex: "price", key: "price" },
  { title: "Total Stock", align: "center", dataIndex: "stock", key: "stock" },
  {
    title: "Added Date",
    align: "center",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => dateTimeFormatter.format(new Date(createdAt)),
  },
  {
    title: "Updated Date",
    align: "center",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt) => dateTimeFormatter.format(new Date(updatedAt)),
  },
  {
    title: "Delete",
    align: "center",
    key: "delete",
    render: ({ _id }) => (
      <Space size="middle">
        <PopupConfirm
          title="Are you sure to delete the product?"
          btnTitle="Delete"
          btnId="delete-product-btn"
          btnName="delete-product-btn"
          icon={<MdDelete />}
          onConfirm={() => handleDeleteProduct(_id)}
          className="font-semibold text-red-600 text-base"
        />
      </Space>
    ),
  },
  {
    title: "Edit",
    align: "center",
    key: "edit",
    render: ({ _id }) => (
      <Space size="medium">
        <EditProductDetailsComp id={_id} />
      </Space>
    ),
  },
];

export { ProductsColumns };
