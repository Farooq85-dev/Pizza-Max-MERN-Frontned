// Libraries Imports
import { Tag } from "antd";

// Local Imports
import { dateTimeFormatter } from "../../../Constatns/index.js";

const columns = [
  {
    title: "Full Name",
    align: "center",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Contact Number",
    align: "center",
    dataIndex: "contactNumber",
    key: "contactNumber",
  },
  {
    title: "Email Address",
    align: "center",
    dataIndex: "emailAddress",
    key: "emailAddress",
  },
  {
    title: "Delivery Charges",
    align: "center",
    dataIndex: "deliveryCharges",
    key: "deliveryCharges",
    render: (deliveryCharges) => `Rs ${deliveryCharges.toFixed(2)}`,
  },

  {
    title: "Status",
    align: "center",
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
    align: "center",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => dateTimeFormatter.format(new Date(createdAt)),
  },
  {
    title: "Grand Total",
    align: "center",
    dataIndex: "grandTotal",
    key: "grandTotal",
    render: (grandTotal) => `Rs ${grandTotal.toFixed(2)}`,
  },
];

export { columns };
