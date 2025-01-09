// Libraries Imports
import { Avatar } from "antd";

// Lcoal Imports
import { dateTimeFormatter } from "../../../Constatns/index.js";

const UsersColumns = [
  {
    title: "Image",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar, { name }) => (
      <Avatar src={avatar} size="large" alt={name} />
    ),
  },
  { title: "Full Name", align: "center", dataIndex: "name", key: "fullName" },
  {
    title: "Email Address",
    align: "center",
    dataIndex: "email",
    key: "emailAddress",
  },
  {
    title: "Signup Date",
    align: "center",
    dataIndex: "createdAt",
    key: "signupdate",
    render: (createdAt) => dateTimeFormatter.format(new Date(createdAt)),
  },
];

export default UsersColumns;
