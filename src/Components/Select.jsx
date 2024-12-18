import PropTypes from "prop-types";
import { Select } from "antd";

const SelectComp = ({ label, options, value, onChange, onBlur, name }) => {
  const handleSelectChange = (selectedValue) => {
    onChange(name, selectedValue);
  };

  return (
    <div className="flex flex-col gap-2 text-base font-semibold">
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        options={options}
        value={value}
        onChange={handleSelectChange}
        onBlur={onBlur}
        className="!w-full bg-white border rounded-md shadow-sm focus:outline-none"
        style={{ width: 120 }}
      />
    </div>
  );
};

SelectComp.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SelectComp;
