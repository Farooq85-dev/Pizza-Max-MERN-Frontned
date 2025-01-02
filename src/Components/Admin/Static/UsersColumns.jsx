import { Avatar } from "antd";
import { dateTimeFormatter } from "../../../Constatns/index.js";

const Userscolumns = [
  {
    title: "Image",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar, { name }) => (
      <Avatar src={avatar} size="large" alt={name} />
    ),
  },
  { title: "Full Name", dataIndex: "name", key: "fullName" },
  { title: "Email Address", dataIndex: "email", key: "emailAddress" },
  {
    title: "Signup Date",
    dataIndex: "createdAt",
    key: "signupdate",
    render: (createdAt) => dateTimeFormatter.format(new Date(createdAt)),
  },
];

export { Userscolumns };
