// Libraries Imports
import React, { useState } from "react";
import { message } from "antd";
import { useFormik } from "formik";
import { SiNamecheap } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { GiPriceTag, GiStockpiles } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import axios from "axios";

// Local Imports
import Input from "../Input";
import Uploader from "../FileInput";
import Button from "../Button";
import { addProductSchema } from "../../Schemas/Index.js";
import Loader from "../Loader";

const AddProductsComp = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const initialValues = {
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryName: "",
  };

  const handleFileChange = (e) => {
    const uplaodFile = e.target.files;
    setFile(uplaodFile);
  };

  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addProductSchema,
    onSubmit: async () => {
      if (!file) {
        return message.error("Please provide a file!");
      }

      if (file?.length > 1) {
        return message.error("Please provide a single file!");
      }

      if (file[0]?.type !== "image/webp") {
        return message.error("File must be in WEBP Foramt!");
      }

      if (file[0]?.size > 50) {
        return message.error("File must be lower than 50 KB!");
      }

      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", "Pizza-Max-Preset");

      setIsLoading(true);
      try {
        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env?.VITE_CLOUD_NAME
          }/image/upload`,
          formData
        );

        const response = await axios.post(
          `${import.meta.env?.VITE_API_URI}/product/admin/product/add`,
          {
            image: uploadResponse?.data?.secure_url,
            name: values.name,
            description: values.description,
            price: values.price,
            stock: values.stock,
            categoryName: values.categoryName,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message);
        handleReset();
      } catch (error) {
        message.success(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start gap-2 w-full"
      >
        <Uploader handleChange={handleFileChange} />
        <Input
          placeHolder="Enter product name."
          id="name"
          name="name"
          label="Name"
          ariaLabel="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          icon={<SiNamecheap size={18} />}
        />
        {errors && touched.name ? (
          <p className="text-base text-red-600">{errors.name}</p>
        ) : null}
        <Input
          placeHolder="Enter product description."
          id="description"
          name="description"
          label="Description"
          ariaLabel="description"
          type="text"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          icon={<MdOutlineDescription size={18} />}
        />
        {errors && touched.description ? (
          <p className="text-base text-red-600">{errors.description}</p>
        ) : null}
        <Input
          placeHolder="Enter product price."
          id="price"
          name="price"
          label="Price"
          ariaLabel="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          icon={<GiPriceTag size={18} />}
        />
        {errors && touched.price ? (
          <p className="text-base text-red-600">{errors.price}</p>
        ) : null}
        <Input
          placeHolder="Enter product availability stock."
          id="stock"
          name="stock"
          label="Stock"
          ariaLabel="stock"
          type="number"
          value={values.stock}
          onChange={handleChange}
          onBlur={handleBlur}
          icon={<GiStockpiles size={18} />}
        />
        {errors && touched.stock ? (
          <p className="text-base text-red-600">{errors.stock}</p>
        ) : null}
        <Input
          placeHolder="Enter product category name."
          id="categoryName"
          name="categoryName"
          label="Category Name"
          ariaLabel="categoryName"
          type="text"
          value={values.categoryName}
          onChange={handleChange}
          onBlur={handleBlur}
          icon={<BiCategoryAlt size={18} />}
        />
        {errors && touched.categoryName ? (
          <p className="text-base text-red-600">{errors.categoryName}</p>
        ) : null}
        <Button
          className="border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-auto"
          title={isLoading ? <Loader width={20} height={3} /> : "Confirm"}
          disabled={isLoading ? true : false}
          id="confirm-product-details-btn"
          name="confirm-product-details-btn"
          type="submit"
        />
      </form>
    </div>
  );
});

export default AddProductsComp;
