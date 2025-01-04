import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const productsContext = createContext();

const useProducts = () => useContext(productsContext);

const AdminProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const howMuchTotalProducts = products?.length;
  const howMuchTotalCategories = categories?.length;

  const fetchProducts = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env?.VITE_API_URI}/admin-get-all-products`
      );
      console.log(response);
      setProducts(response?.data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env?.VITE_API_URI}/get-all-products-categories`
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

  return (
    <productsContext.Provider
      value={{
        products,
        categories,
        howMuchTotalProducts,
        howMuchTotalCategories,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

AdminProductsProvider.propTypes = {
  children: PropTypes.node,
};

export { AdminProductsProvider, useProducts };
