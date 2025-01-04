import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const productsContext = createContext();

const useProducts = () => useContext(productsContext);

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      // Fetch categories first
      const categoriesResponse = await axios.post(
        `${import.meta.env?.VITE_API_URI}/get-all-products-categories`
      );
      const categories = categoriesResponse?.data?.categories || [];
      setCategories(categories);
      const allProducts = await Promise.all(
        categories?.map(async (category) => {
          // fetch Prodcuts on the base of category
          const response = await axios.post(
            `${import.meta.env?.VITE_API_URI}/get-all-products`,
            { categoryName: category }
          );
          return {
            category: category,
            products: response?.data?.products || [],
          };
        })
      );
      console.log(products);
      setProducts(allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <productsContext.Provider value={{ products, categories }}>
      {children}
    </productsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node,
};

export { ProductsProvider, useProducts };
