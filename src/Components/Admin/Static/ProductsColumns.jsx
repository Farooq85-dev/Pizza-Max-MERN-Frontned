import { Avatar, Space } from "antd";
import { dateTimeFormatter } from "../../../Constatns/index.js";
import Button from "../../Button.jsx";
import { IoIosDocument } from "react-icons/io";

const ProductsColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image, { name }) => <Avatar src={image} size="large" alt={name} />,
  },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Price", dataIndex: "price", key: "price" },
  { title: "Total Stock", dataIndex: "stock", key: "stock" },
  {
    title: "Added Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => dateTimeFormatter.format(new Date(createdAt)),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        {" "}
        <Button
          title="View Details"
          icon={<IoIosDocument size={18} />}
          name="view-details-btn"
          type="button"
          id="view-details-btn"
          className="font-semibold text-red-600 text-base"
        />
      </Space>
    ),
  },
];

export { ProductsColumns };
