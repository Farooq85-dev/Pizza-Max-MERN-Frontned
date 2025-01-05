// Libraries Imports
import PropTypes from "prop-types";

const LoaderComp = ({
  width,
  borderWidth,
  primaryColor,
  secondaryColor,
  height,
}) => {
  const loaderStyle = {
    width: `${width}px`,
    borderWidth: `${borderWidth}px`,
    borderColor: `${primaryColor}`,
    borderRightColor: `${secondaryColor}vh`,
  };

  return (
    <div className="loader-container" style={{ height }}>
      <div className="loader" style={loaderStyle}></div>
    </div>
  );
};

LoaderComp.propTypes = {
  width: PropTypes.number,
  borderWidth: PropTypes.number,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  height: PropTypes.number,
};

export default LoaderComp;
