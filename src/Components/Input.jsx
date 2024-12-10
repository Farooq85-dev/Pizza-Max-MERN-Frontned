import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const InputComp = ({
  type,
  icon,
  id,
  name,
  ariaLabel,
  placeHolder,
  value,
  onChange,
  onBlur,
}) => {
  const [togglePassword, setTogglePassword] = useState(false);

  const handlePasswordToggle = () => {
    setTogglePassword((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <input
        type={
          type === "password" ? (togglePassword ? "text" : "password") : type
        }
        id={id}
        name={name}
        aria-label={ariaLabel}
        className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-navbarColor text-base focus:border-b-red-600 focus:border-t-transparent focus:border-x-transparent focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
        {icon}
      </div>
      {type === "password" && (
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-2 text-gray-500 dark:text-neutral-400"
          onClick={handlePasswordToggle}
          aria-label="Toggle password visibility"
        >
          {togglePassword ? (
            <FaEye size={18} className="text-navbarColor" />
          ) : (
            <FaEyeSlash size={18} className="text-navbarColor" />
          )}
        </button>
      )}
    </div>
  );
};

InputComp.propTypes = {
  icon: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default InputComp;
