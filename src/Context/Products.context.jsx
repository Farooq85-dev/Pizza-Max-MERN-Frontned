// Libraries Imports
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const productsContext = createContext();

const useProducts = () => useContext(productsContext);

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      // Fetch categories first
      const categoriesResponse = await axios.get(
        `${import.meta.env?.VITE_API_URI}/product/categories`
      );
      const categories = categoriesResponse?.data?.categories || [];
      setCategories(categories);
      const allProducts = await Promise.all(
        categories?.map(async (category) => {
          // fetch Prodcuts on the base of category
          const response = await axios.get(
            `${import.meta.env?.VITE_API_URI}/product/products/${category}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          return {
            category: category,
            products: response?.data?.products || [],
          };
        })
      );
      setProducts(allProducts);
    } catch (error) {
      console.log("error ===>", error);
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
  children: PropTypes.node.isRequired,
};

export { ProductsProvider, useProducts };
