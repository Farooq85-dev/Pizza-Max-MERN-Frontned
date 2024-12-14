import { Card } from "antd";
import PropTypes from "prop-types";

const OrdersStatusCardComp = ({ icon, title, quantity }) => {
  return (
    <Card title={title} bordered={true} extra={icon}>
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-medium">Amount </h3>
        <h3 className="text-base font-semibold">{quantity}</h3>
      </div>
    </Card>
  );
};

OrdersStatusCardComp.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default OrdersStatusCardComp;
