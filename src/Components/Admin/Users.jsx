import { LuUsersRound } from "react-icons/lu";
import UsersStatusCard from "../StatusCard";
import { useUsers } from "../../Context/Admin/Users.context";
import Table from "../Table";
import { Userscolumns } from "./Static/UsersColumns";

const UsersComp = () => {
  const {
    users,
    howMuchTotalUsers,
    howMuchUnVerifiedUsers,
    howMuchVerifiedUsers,
  } = useUsers();

  const data = users?.map((order) => ({ ...order, key: order?._id }));

  return (
    <div>
      <div className="users-stauts-cartd-container grid grid-col-1 md:grid-cols-3 gap-4 mb-4">
        <UsersStatusCard
          title="Total Users"
          icon={<LuUsersRound />}
          quantity={howMuchTotalUsers}
        />
        <UsersStatusCard
          title="Verified Users"
          icon={<LuUsersRound />}
          quantity={howMuchVerifiedUsers?.length}
        />
        <UsersStatusCard
          title="Un-Verified Users"
          icon={<LuUsersRound />}
          quantity={howMuchUnVerifiedUsers?.length}
        />
      </div>
      <Table data={data} columns={Userscolumns} />
    </div>
  );
};

export default UsersComp;
