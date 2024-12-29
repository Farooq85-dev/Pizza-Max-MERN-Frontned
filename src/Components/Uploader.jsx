import PropTypes from "prop-types";

const UploaderComp = ({ handleChange }) => {
  return (
    <>
      <label htmlFor="file-input" className="sr-only">
        Choose file
      </label>
      <input
        type="file"
        name="file-input"
        id="file-input"
        onChange={handleChange}
        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
        file:bg-gray-50 file:border-0 file:me-4 file:cursor-pointer file:text-sm file:font-semibold file:!text-white file:!bg-[#473222] file:py-3 file:px-4"
      />
    </>
  );
};

UploaderComp.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default UploaderComp;
