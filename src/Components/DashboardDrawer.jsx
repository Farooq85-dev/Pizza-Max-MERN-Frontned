// Libraries Imports
import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";

const DashbaordDrawerComp = React.memo(({ isOpen, onClose, content }) => {
  return (
    <Drawer
      title="Menu"
      placement="left"
      width={350}
      onClose={onClose}
      open={isOpen}
    >
      {content}
    </Drawer>
  );
});

DashbaordDrawerComp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
};

export default DashbaordDrawerComp;
