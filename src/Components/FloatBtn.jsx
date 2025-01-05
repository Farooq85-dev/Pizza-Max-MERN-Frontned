// Libraries Imports
import { FloatButton } from "antd";
import { IoIosArrowDropup } from "react-icons/io";

const FloatBtnComp = () => {
  return (
    <FloatButton.BackTop
      shape="square"
      duration={1200}
      tooltip="Goto Top"
      icon={<IoIosArrowDropup />}
    />
  );
};

export default FloatBtnComp;
