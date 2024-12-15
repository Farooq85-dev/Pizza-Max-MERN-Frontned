import { Drawer } from "antd";
import PropTypes from "prop-types";
import React from "react";

const DrawerComp = React.memo(
  ({ isVisible, onClose, title, content, footer, placement }) => {
    return (
      <Drawer
        title={title}
        placement={placement}
        width={400}
        onClose={onClose}
        footer={footer && footer}
        open={isVisible}
      >
        {content}
      </Drawer>
    );
  }
);

DrawerComp.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  footer: PropTypes.node,
  placement: PropTypes.string.isRequired,
};

export default DrawerComp;
