import ProductCard from "./ProductCard";
import Input from "./Input";
import { IoSearchSharp } from "react-icons/io5";
import useDebounce from "../Hooks/Debounce";
import { useState } from "react";
import { useProducts } from "../Context/Products.context";

const ProductsComp = () => {
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const debouncedText = useDebounce(search, 1000);

  const filteredCategories = products
    ?.map((category) => ({
      ...category,
      products: category.products?.filter((product) =>
        product?.name?.toLowerCase()?.includes(debouncedText?.toLowerCase())
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
      {filteredCategories?.length > 0 ? (
        filteredCategories.map((category) => (
          <div
            id={category.category}
            key={category.category}
            className="category-section"
          >
            <h2 className="text-2xl font-bold">{category.category}</h2>
            <div className="products-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2 sm:py-4">
              {category.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-base sm:text-xl">
          No products matches with your search.
        </p>
      )}
      <footer className="products-footer mt-4 flex flex-col justify-start gap-2">
        <h2 className="text-left text-base sm:text-xl font-semibold">
          Best Pizza in Delivery
        </h2>
        <p className="text-left sm:text-base">
          Satisfy your cheesy cravings with the best pizza in Pakistan. Our
          pizzas are made fresh every day and delivered fast to deliver the MAX
          experience. Order now on our web and app and get exclusive discounts.
        </p>
      </footer>
    </div>
  );
};

export default ProductsComp;
