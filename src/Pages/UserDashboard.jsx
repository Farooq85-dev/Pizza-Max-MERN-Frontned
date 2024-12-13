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

// Define menu items
function getItem(label, key, icon) {
  return { key, icon, label };
}

const menuItems = [
  getItem("Dashboard", "Dashboard", <PieChartOutlined />),
  getItem("Reports", "Reports", <DesktopOutlined />),
  getItem("User Management", "User Management", <UserOutlined />),
  getItem("Team", "Team", <TeamOutlined />),
  getItem("Files", "Files", <FileOutlined />),
];

const UserDashboardPage = () => {
  const [selectedKey, setSelectedKey] = useState("Dashboard");
  const [breadcrumb, setBreadcrumb] = useState([
    { title: "User" },
    { title: "Dashboard" },
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
      case "Dashboard":
        return <div>Welcome to the Dashboard</div>;
      case "Reports":
        return <div>Reports Overview</div>;
      case "User Management":
        return <div>User Management Details</div>;
      case "Team":
        return <div>Team Details</div>;
      case "Files":
        return <div>File Management</div>;
      default:
        return <div>Select an option from the menu</div>;
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
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: colorBgContainer,
          }}
        >
          <h2>User Dashboard</h2>
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
