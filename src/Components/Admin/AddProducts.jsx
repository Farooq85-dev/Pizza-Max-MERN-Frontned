import { useFormik } from "formik";
import React, { useState } from "react";
import Input from "../Input";
import { SiNamecheap } from "react-icons/si";
import { MdOutlineDescription } from "react-icons/md";
import { GiPriceTag, GiStockpiles } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import Button from "../Button";
import { addProductSchema } from "../../Schemas";
import Uploader from "../Uploader";
import { message } from "antd";
import axios from "axios";

const AddProductsComp = React.memo(() => {
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

      if (file.length > 1) {
        return message.error("Please provide a single file!");
      }

      if (file[0].type !== "image/webp") {
        return message.error("File must be in WEBP Foramt!");
      }

      const data = new FormData();
      data.append("productImage", file[0]);
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("price", values.price);
      data.append("stock", values.stock);
      data.append("categoryName", values.categoryName);

      try {
        const response = await axios.post(
          `${import.meta.env?.VITE_API_URI}/add-product`,
          data,
          {
            headers: {
              "Content-Type": "multipart/formData",
            },
            withCredentials: true,
          }
        );
        message.success(response?.data?.message);
        console.log(response?.data?.product);
        handleReset();
      } catch (error) {
        console.log(error);
        message.success(error?.response?.data?.message);
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
  );
});

export default AddProductsComp;
