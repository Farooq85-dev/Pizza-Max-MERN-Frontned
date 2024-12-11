import PropTypes from "prop-types";

const LoaderComp = ({ width, borderWidth, primaryColor, secondaryColor }) => {
  const loaderStyle = {
    width: `${width}px`,
    borderWidth: `${borderWidth}px`,
    borderColor: `${primaryColor}`,
    borderRightColor: `${secondaryColor}`,
  };

  return (
    <div className="loader-container">
      <div className="loader" style={loaderStyle}></div>
    </div>
  );
};

LoaderComp.propTypes = {
  width: PropTypes.number,
  borderWidth: PropTypes.number,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
};

export default LoaderComp;
