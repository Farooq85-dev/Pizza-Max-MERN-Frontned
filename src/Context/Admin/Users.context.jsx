import { useContext, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const orderContext = createContext();

const useUsers = () => useContext(orderContext);

const AdminUsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env?.VITE_API_URI}/get-all-users`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setUsers(response?.data?.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  const howMuchTotalUsers = users?.length;

  const howMuchUnVerifiedUsers = users?.filter(
    (user) => user?.isVerified === false
  );
  const howMuchVerifiedUsers = users?.filter(
    (user) => user?.isVerified === true
  );

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <orderContext.Provider
      value={{
        users,
        howMuchTotalUsers,
        howMuchUnVerifiedUsers,
        howMuchVerifiedUsers,
      }}
    >
      {children}
    </orderContext.Provider>
  );
};

AdminUsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useUsers, AdminUsersProvider };
