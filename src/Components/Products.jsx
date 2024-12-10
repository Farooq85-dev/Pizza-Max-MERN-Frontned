import { categories } from "../Db/products";
import ProductCard from "./ProductCard";

const ProductsComp = () => {
  return (
    <div className="text-center sm:text-left p-4 sm:px-10">
      {categories?.map((category) => (
        <div id={category.id} key={category.id} className="category-section">
          <h2 className="text-2xl font-bold">{category.title}</h2>
          <p>{category.description}</p>
          <div className="products-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-2 sm:py-4">
            {category?.products?.map((product) => (
              <ProductCard
                key={product.id}
                productTitle={product.title}
                productDescription={product.description}
                productPrice={product.price}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsComp;
