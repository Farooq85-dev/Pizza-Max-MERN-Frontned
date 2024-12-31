import { Drawer } from "antd";
import PropTypes from "prop-types";
import React from "react";

const UserDashbaordDrawer = React.memo(({ isOpen, onClose, content }) => {
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

UserDashbaordDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
};

export default UserDashbaordDrawer;
