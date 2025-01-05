// Libraries Imports
import PropTypes from "prop-types";
import { Popconfirm } from "antd";

// Local Imports
import Button from "./Button";

const PopupConfirmComp = ({
  title,
  btnTitle,
  btnId,
  btnName,
  onConfirm,
  className,
  icon,
}) => {
  const confirm = () => {
    onConfirm();
  };

  return (
    <Popconfirm title={title} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button
        title={btnTitle}
        id={btnId}
        name={btnName}
        className={className}
        type="button"
        icon={icon}
      />
    </Popconfirm>
  );
};

PopupConfirmComp.propTypes = {
  title: PropTypes.string.isRequired,
  btnTitle: PropTypes.string.isRequired,
  btnId: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default PopupConfirmComp;
