import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const orderContext = createContext();

const useOrder = () => useContext(orderContext);

const AdminOrderProvider = ({ children }) => {
  const [orders, setOrder] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env?.VITE_API_URI}/get-all-orders`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setOrder(response?.data?.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  const howMuchTotalOrders = orders?.length;

  const howMuchPendingOrders = orders?.filter(
    (order) => order?.status === "pending"
  );

  const howMuchDeliveredOrders = orders?.filter(
    (order) => order?.status === "delivered"
  );

  const howMuchCancelledOrders = orders?.filter(
    (order) => order?.status === "cancelled"
  );

  useEffect(() => {
    fetchUserOrders();
  }, []);
  return (
    <orderContext.Provider
      value={{
        orders,
        howMuchTotalOrders,
        howMuchPendingOrders,
        howMuchDeliveredOrders,
        howMuchCancelledOrders,
      }}
    >
      {children}
    </orderContext.Provider>
  );
};

AdminOrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useOrder, AdminOrderProvider };
