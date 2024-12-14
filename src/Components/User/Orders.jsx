import { IoStatsChartSharp } from "react-icons/io5";
import orders from "../../Db/orders";
import OrdersStatusCard from "./OrdersStatusCard";
import Table from "../Table";
import { columns } from "./Static/Table";

const OrdersComp = () => {
  const howMuchTotalOrders = orders?.length;

  const howMuchPendingOrders = orders?.filter(
    (order) => order?.orderStatus === "pending"
  );

  const howMuchCompletedOrders = orders?.filter(
    (order) => order?.orderStatus === "completed"
  );

  const howMuchCancelledOrders = orders?.filter(
    (order) => order?.orderStatus === "cancelled"
  );

  const dataSourceWithKeys = orders
    ?.filter((item) => item?.customerName === "Muhammmad Farooq")
    .map((item) => ({
      ...item,
      key: item.id,
    }));

  return (
    <div>
      <div className="orders-details-container grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            title="Completed Orders"
            icon={<IoStatsChartSharp size={20} />}
            quantity={howMuchCompletedOrders?.length}
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
        <Table data={dataSourceWithKeys} columns={columns} />
      </div>
    </div>
  );
};

export default OrdersComp;
