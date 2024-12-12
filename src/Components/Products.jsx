import { categories } from "../Db/products";
import ProductCard from "./ProductCard";
import Input from "./Input";
import { IoSearchSharp } from "react-icons/io5";
import useDebounce from "../Hooks/Debounce";
import { useState } from "react";

const ProductsComp = () => {
  const [search, setSearch] = useState("");
  const debouncedText = useDebounce(search, 1500);

  const filteredProducts = categories
    ?.map((category) => ({
      ...category,
      products: category?.products?.filter((product) =>
        product?.title?.toLowerCase().includes(debouncedText?.toLowerCase())
      ),
    }))
    .filter((category) => category.products.length > 0);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="text-center sm:text-left p-4 sm:px-10">
      <div className="mb-4">
        <Input
          id="search"
          name="search"
          type="text"
          ariaLabel="search"
          placeHolder="Search products here..."
          label="Search"
          value={search}
          onChange={handleSearch}
          icon={<IoSearchSharp size={20} />}
        />
      </div>
      {filteredProducts?.length > 0 ? (
        filteredProducts?.map((category) => (
          <div
            id={category?.id}
            key={category?.id}
            className="category-section"
          >
            <h2 className="text-2xl font-bold">{category?.title}</h2>
            <p className="text-gray-600">{category?.description}</p>
            <div className="products-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2 sm:py-4">
              {category?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No products match your search.</p>
      )}
    </div>
  );
};

export default ProductsComp;
