// Libraries Imports
import { useEffect, useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import axios from "axios";

// Local Imports Imports
import Button from "../Button";
import Modal from "../Modal";
import ProductsStatusCard from "../StatusCard";
import ProductsTable from "../Table";
import AddProducts from "./AddProducts";
import { ProductsColumns } from "./Static/ProductsColumns";
import Loader from "../Loader";

const AdminProductsComp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env?.VITE_API_URI}/product/admin/products`,
        {
          withCredentials: true,
        }
      );
      setProducts(response?.data?.products || []);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env?.VITE_API_URI}/product/categories`
      );
      setCategories(response?.data?.categories || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const data = products?.map((product) => ({
    ...product,
    key: product?._id,
  }));

  if (isLoading) {
    return <Loader size={30} height={100} />;
  }

  return (
    <div>
      <div className="products-status-container grid grid-col-1 md:grid-cols-2 gap-4 mb-2">
        <ProductsStatusCard
          title="Total Products"
          icon={<AiFillProduct size={20} />}
          quantity={products?.length}
        />
        <ProductsStatusCard
          title="Total Categories"
          icon={<BiCategoryAlt size={20} />}
          quantity={categories?.length}
        />
      </div>
      <div className="flex justify-end mb-2">
        <Button
          title="Add Product"
          name="add-product-btn"
          type="button"
          id="addd-product-btn"
          className="border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-auto"
          icon={<MdAdd size={20} color="white" />}
          onClick={handleToggleModal}
        />
      </div>
      <Modal
        isConfirm={false}
        isVisible={isModalVisible}
        onClose={handleToggleModal}
        title="Add Product"
        content={<AddProducts />}
      />
      <ProductsTable columns={ProductsColumns} data={data} pageSize={10} />
    </div>
  );
};

export default AdminProductsComp;
