import PropTypes from "prop-types";

const TextAreaComp = ({
  id,
  name,
  label,
  ariaLabel,
  placeHolder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="block font-semibold mb-2">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          aria-label={ariaLabel}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="py-2 pl-3 pr-4 w-full bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-navbarColor focus:border-navbarColor resize-y"
        />
      </div>
    </div>
  );
};

TextAreaComp.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default TextAreaComp;
