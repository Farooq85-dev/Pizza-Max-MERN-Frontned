// Libraries Imports
import { useEffect, useState } from "react";
import { FaUserSlash } from "react-icons/fa";
import { LuUserSearch, LuUsersRound } from "react-icons/lu";
import axios from "axios";

// Local Imports
import Table from "../Table";
import { Userscolumns } from "./Static/UsersColumns";
import UsersStatusCard from "../StatusCard";
import Loader from "../Loader";

const UsersComp = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env?.VITE_API_URI}/user/admin/users`,
        {
          withCredentials: true,
        }
      );
      setUsers(response?.data?.users || []);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    fetchOrders();
  }, []);

  if (isLoading) {
    return <Loader size={30} height={100} />;
  }

  const data = users?.map((order) => ({ ...order, key: order?._id }));

  return (
    <div>
      <div className="users-stauts-cartd-container grid grid-col-1 md:grid-cols-3 gap-4 mb-4">
        <UsersStatusCard
          title="Total Users"
          icon={<LuUsersRound size={20} />}
          quantity={howMuchTotalUsers}
        />
        <UsersStatusCard
          title="Verified Users"
          icon={<LuUserSearch size={20} />}
          quantity={howMuchVerifiedUsers?.length}
        />
        <UsersStatusCard
          title="Un-Verified Users"
          icon={<FaUserSlash size={20} />}
          quantity={howMuchUnVerifiedUsers?.length}
        />
      </div>
      <Table data={data} columns={Userscolumns} pageSize={10} />
    </div>
  );
};

export default UsersComp;
