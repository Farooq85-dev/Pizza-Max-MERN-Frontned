import { IoStatsChartSharp } from "react-icons/io5";
import OrdersStatusCard from "../StatusCard";
import Table from "../Table";
import { columns } from "./Static/OrdersColumns";
import { useOrder } from "../../Context/User/Orders.context";

const OrdersComp = () => {
  const {
    orders,
    howMuchTotalOrders,
    howMuchPendingOrders,
    howMuchDeliveredOrders,
    howMuchCancelledOrders,
  } = useOrder();

  const data = orders.map((order) => ({ ...order, key: order?._id }));

  return (
    <div>
      <div className="orders-details-container grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="total-orders-container">
          <OrdersStatusCard
            title="Total Orders"
            icon={<IoStatsChartSharp size={20} />}
            quantity={howMuchTotalOrders}
          />
        </div>
        <div className="pending-orders-container">
          <OrdersStatusCard
            title="Pending Orders"
            icon={<IoStatsChartSharp size={20} />}
            quantity={howMuchPendingOrders?.length}
          />
        </div>
        <div className="completed-orders-container">
          <OrdersStatusCard
            title="Delivered Orders"
            icon={<IoStatsChartSharp size={20} />}
            quantity={howMuchDeliveredOrders?.length}
          />
        </div>
        <div className="cancelled-orders-container">
          <OrdersStatusCard
            title="Cancelled Orders"
            icon={<IoStatsChartSharp size={20} />}
            quantity={howMuchCancelledOrders?.length}
          />
        </div>
      </div>
      <div className="order-table-container mt-4">
        <Table data={data} columns={columns} pageSize={10} />
      </div>
    </div>
  );
};

export default OrdersComp;
