import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
const { Header, Content, Sider } = Layout;
import Welcome from "../Components/User/Welcome";
import Orders from "../Components/User/Orders";
import { SiWelcometothejungle } from "react-icons/si";
import { GiBoxUnpacking } from "react-icons/gi";

// Define menu items
function getItem(label, key, icon) {
  return { key, icon, label };
}

const menuItems = [
  getItem("Welcome", "Welcome", <SiWelcometothejungle />),
  getItem("Orders", "Orders", <GiBoxUnpacking />),
];

const UserDashboardPage = () => {
  const [selectedKey, setSelectedKey] = useState("Orders");
  const [breadcrumb, setBreadcrumb] = useState([
    { title: "User" },
    { title: "Welcome" },
  ]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle menu click
  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    setBreadcrumb([{ title: "User" }, { title: key }]);
  };

  const greateThanSmallScreen = useMediaQuery({
    query: "(min-width: 576px)",
  });

  const lessThanSmallScreen = useMediaQuery({
    query: "(max-width: 576px)",
  });

  const headerMenu = (
    <Dropdown
      menu={{
        items: [
          { label: "Profile", key: "profile" },
          { label: "Logout", key: "logout" },
        ],
      }}
    >
      <Avatar
        size="large"
        style={{ backgroundColor: "#87d068" }}
        icon={<UserOutlined />}
      />
    </Dropdown>
  );

  // Render dynamic content based on selected key
  const renderContent = () => {
    switch (selectedKey) {
      case "Welcome":
        return <Welcome />;
      case "Orders":
        return <Orders />;
      case "Reports":
        return <div>Reports Overview</div>;
      case "User Management":
        return <div>User Management Details</div>;
      case "Team":
        return <div>Team Details</div>;
      case "Files":
        return <div>File Management</div>;
      default:
        return <h1>Sorry! that page {"doesn't"} exist</h1>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={
          (greateThanSmallScreen && false) || (lessThanSmallScreen && true)
        }
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["Dashboard"]}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: colorBgContainer,
          }}
        >
          <h2 className="font-medium text-base sm:text-xl">Muhammad Farooq</h2>
          {headerMenu}
        </Header>
        <Content style={{ margin: "16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} items={breadcrumb} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboardPage;
