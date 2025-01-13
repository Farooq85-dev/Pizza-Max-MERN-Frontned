// Libraries Imports
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const userContext = createContext();

const useUser = () => useContext(userContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env?.VITE_API_URI}/user/authenticate`,
        {
          withCredentials: true,
        }
      );
      setUser(response?.data?.user);
      setIsUser(true);
    } catch (error) {
      console.log(error);
      setIsUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isUser]);

  return (
    <userContext.Provider value={{ user, isUser }}>
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useUser, UserProvider };
