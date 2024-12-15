import { Popconfirm } from "antd";
import PropTypes from "prop-types";
import Button from "./Button";

const PopupConfirmComp = ({ title, onConfirm }) => {
  const confirm = () => {
    onConfirm();
  };

  return (
    <Popconfirm title={title} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button
        title="Clear Cart"
        id="clear-cart-btn"
        name="clear-cart-btn"
        className={
          "border-2 border-red-600 rounded-md px-4 py-2 font-semibold text-red-600 text-base w-full"
        }
        type="button"
      />
    </Popconfirm>
  );
};

PopupConfirmComp.propTypes = {
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default PopupConfirmComp;
