import { Space, Tag } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image, { id }) => (
      <img
        key={id}
        src={image}
        alt="Product"
        style={{ width: 50, height: 50 }}
      />
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `$${price.toFixed(2)}`,
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
    key: "orderDate",
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (status, { id }) => {
      let color = "blue";
      if (status === "pending") color = "orange";
      else if (status === "completed") color = "green";
      else if (status === "cancelled") color = "red";

      return (
        <Tag key={id} color={color}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: ({ id }) => (
      <Space key={id} size="middle">
        <Link>View Details</Link>
      </Space>
    ),
  },
];

export { columns };
