import { AiFillProduct } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { useProducts } from "../../Context/Admin/Products.context";
import ProductsStatusCard from "../StatusCard";
import ProductsTable from "../Table";
import { ProductsColumns } from "./Static/ProductsColumns";
import Button from "../Button";
import { MdAdd } from "react-icons/md";
import Modal from "../Modal";
import { useState } from "react";
import AddProducts from "./AddProducts";

const AdminProductsComp = () => {
  const { howMuchTotalProducts, howMuchTotalCategories, products } =
    useProducts();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const data = products?.map((product) => ({
    ...product,
    key: product?._id,
  }));

  return (
    <div>
      <div className="products-status-container grid grid-col-1 md:grid-cols-2 gap-4 mb-2">
        <ProductsStatusCard
          title="Total Products"
          icon={<AiFillProduct size={20} />}
          quantity={howMuchTotalProducts}
        />
        <ProductsStatusCard
          title="Total Categories"
          icon={<BiCategoryAlt size={20} />}
          quantity={howMuchTotalCategories}
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
