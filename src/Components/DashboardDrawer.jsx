// Libraries Imports
import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";

const styles = {
  header: {
    color: "white",
    
  },
  body: {
    backgroundColor: "#473222",
    padding: "0px",
  },
};

const DashbaordDrawerComp = React.memo(({ isOpen, onClose, content }) => {
  return (
    <Drawer
      title={<div style={styles.header}>Menu</div>}
      placement="left"
      width={280}
      onClose={onClose}
      open={isOpen}
      keyboard={true}
      style={styles.body}
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
