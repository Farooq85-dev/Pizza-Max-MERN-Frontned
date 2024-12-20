import { Space, Tag } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
    key: "contactNumber",
  },
  {
    title: "Email Address",
    dataIndex: "emailAddress",
    key: "emailAddress",
  },
  {
    title: "Delivery Charges",
    dataIndex: "deliveryCharges",
    key: "deliveryCharges",
    render: (deliveryCharges) => `$${deliveryCharges.toFixed(2)}`,
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status, { _id }) => {
      let color = "blue";
      if (status === "pending") color = "orange";
      else if (status === "completed") color = "green";
      else if (status === "cancelled") color = "red";

      return (
        <Tag key={_id} color={color}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Order Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => new Date(createdAt).toLocaleDateString(),
  },
  {
    title: "Grand Total",
    dataIndex: "grandTotal",
    key: "grandTotal",
    render: (grandTotal) => `$${grandTotal.toFixed(2)}`,
  },

  {
    title: "Action",
    key: "action",
    render: ({ _id }) => (
      <Space key={_id} size="middle">
        <Link to={`/orders/${_id}`}>View Details</Link>
      </Space>
    ),
  },
];

export { columns };
