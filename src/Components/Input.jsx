// Libraries Imports
import { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputComp = ({
  type,
  icon,
  id,
  name,
  label,
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
      <label htmlFor={name} className="block font-semibold mb-2 text-left">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type === "password" ? (togglePassword ? "text" : "password") : type
          }
          id={id}
          name={name}
          aria-label={ariaLabel}
          className="py-2 pl-10 w-full bg-white border rounded-md shadow-sm focus:outline-none"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />

        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}

        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
            onClick={handlePasswordToggle}
            aria-label="Toggle password visibility"
          >
            {togglePassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

InputComp.propTypes = {
  icon: PropTypes.node,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default InputComp;
