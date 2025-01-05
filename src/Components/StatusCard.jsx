// Libraries Imports
import PropTypes from "prop-types";
import { Card } from "antd";

const StatusCardComp = ({ icon, title, quantity }) => {
  return (
    <Card title={title} bordered={true} extra={icon}>
      <div className="flex justify-between items-center ">
        <h3 className="text-base font-medium">Quantity</h3>
        <h3 className="text-base font-semibold">{quantity}</h3>
      </div>
    </Card>
  );
};

StatusCardComp.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default StatusCardComp;
