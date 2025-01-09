// Libraries Imports
import { useEffect, useState, lazy } from "react";
import { IoStatsChartSharp } from "react-icons/io5";
import axios from "axios";

// Local Imports
import OrdersTable from "../Table";
import OrdersColumns from "./Static/OrdersColumns";
const OrdersStatusCard = lazy(() => import("../StatusCard"));
import Loader from "../Loader";

const OrdersComp = () => {
  const [orders, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env?.VITE_API_URI}/order/user/orders`,
        {
          withCredentials: true,
        }
      );
      setOrder(response?.data?.orders || []);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const howMuchTotalOrders = orders?.length;
  const howMuchPendingOrders = orders?.filter(
    (order) => order?.status === "pending"
  );
  const howMuchDeliveredOrders = orders?.filter(
    (order) => order?.status === "delivered"
  );
  const howMuchCancelledOrders = orders?.filter(
    (order) => order?.status === "cancelled"
  );

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (isLoading) {
    return <Loader size={30} height={100} />;
  }

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
        <OrdersTable data={data} columns={OrdersColumns} pageSize={10} />
      </div>
    </div>
  );
};

export default OrdersComp;
