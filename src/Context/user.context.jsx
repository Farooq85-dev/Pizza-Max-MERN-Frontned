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
      const response = await axios.post(
        `${import.meta.env?.VITE_API_URI}/is-user`,
        null,
        {
          withCredentials: true,
        }
      );
      setIsUser(true);
      console.log(response);
      setUser(response?.data?.user);
    } catch (error) {
      console.log(error);
      setIsUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, isUser }}>
      {children}
    </userContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export { useUser, UserProvider };
