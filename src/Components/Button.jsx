import PropTypes from "prop-types";

const ButtonComp = ({
  className,
  disabled,
  type,
  name,
  id,
  onClick,
  title,
  icon,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      name={name}
      id={id}
      onClick={onClick}
      className={`${className} flex justify-center items-center gap-2`}
    >
      {icon}
      {title}
    </button>
  );
};

ButtonComp.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default ButtonComp;
