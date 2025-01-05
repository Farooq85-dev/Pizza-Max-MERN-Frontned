// Libraries Imports
import { Result } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Local Imports
import Button from "./Button";

const ResultComp = ({
  status,
  icon,
  text,
  className,
  btnText,
  url,
  isBtn = false,
}) => (
  <Result
    status={status}
    className="flex flex-col justify-center items-center gap-1"
    icon={icon}
    title={text}
    extra={
      isBtn === true && (
        <Link to={url}>
          <Button
            id="result-redirection-btn"
            name="result-redirection-btn"
            type="button"
            title={btnText}
            className={className}
          />
        </Link>
      )
    }
  />
);

ResultComp.propTypes = {
  status: PropTypes.number,
  icon: PropTypes.node,
  text: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  isBtn: PropTypes.bool.isRequired,
};

export default ResultComp;
