import { AiFillProduct } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { useProducts } from "../../Context/Admin/Products.context";
import ProductsStatusCard from "../StatusCard";
import ProductsTable from "../Table";
import { ProductsColumns } from "./Static/ProductsColumns";

const AdminProductsComp = () => {
  const { howMuchTotalProducts, howMuchTotalCategories, products } =
    useProducts();

  const data = products?.map((product) => ({
    ...product,
    key: product?._id,
  }));

  return (
    <div>
      <div className="products-status-container grid grid-col-1 md:grid-cols-2 gap-4 mb-4">
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
      <ProductsTable columns={ProductsColumns} data={data} pageSize={10} />
    </div>
  );
};

export default AdminProductsComp;
