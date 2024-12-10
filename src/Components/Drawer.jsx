import { Button, Drawer, Space } from "antd";
import React from "react";

const DrawerComp = React.memo(({ isOpen, handleDrawer }) => {
  return (
    <Drawer
      title="Your Cart"
      className="text-base"
      placement="right"
      width={378}
      onClose={handleDrawer}
      open={isOpen}
    >
      <h1>Hello Drawer</h1>
    </Drawer>
  );
});

export default DrawerComp;
