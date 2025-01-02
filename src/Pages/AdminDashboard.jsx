import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Dropdown,
  Layout,
  Menu,
  message,
  theme,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GiBoxUnpacking } from "react-icons/gi";
import { SiWelcometothejungle } from "react-icons/si";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Orders from "../Components/Admin/Orders";
import UserDashboardDrawer from "../Components/User/UserDashboardDrawer";
import Welcome from "../Components/User/Welcome";
import Users from "../Components/Admin/Users";
import AdminAccount from "../Components/Admin/Profile";
import { useUser } from "../Context/User.context";
import "./user-dashboard.scss";
const { Header, Content, Sider } = Layout;

// Define menu items
function getItem(label, key, icon) {
  return { key, icon, label };
}

const menuItems = [
  getItem("Welcome", "Welcome", <SiWelcometothejungle />),
  getItem("Orders", "Orders", <GiBoxUnpacking />),
  getItem("Users", "Users", <FaUserShield />),
  getItem("Account", "Account", <FaUserShield />),
];

const AdminDashboardPage = () => {
  const [selectedKey, setSelectedKey] = useState("Welcome");
  const [breadcrumb, setBreadcrumb] = useState([
    { title: "Admin" },
    { title: "Welcome" },
  ]);

  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  const { user } = useUser();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle menu click
  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    setBreadcrumb([{ title: "Admin" }, { title: key }]);
  };

  const [drawerContent, setDrawerContent] = useState({
    content: (
      <Menu
        theme="dark"
        defaultSelectedKeys={["Welcome"]}
        mode="inline"
        items={menuItems}
        onClick={handleMenuClick}
      />
    ),
  });

  // Handle Drawer on mobile screen
  const openDrawer = (content) => {
    setDrawerContent({ content });
    setDrawerVisible(!isDrawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "Welcome":
        return <Welcome />;
      case "Orders":
        return <Orders />;
      case "Users":
        return <Users />;
      case "Account":
        return <AdminAccount />;
      default:
        return <h1>Sorry! that page {"doesn't"} exist</h1>;
    }
  };

  const handleLogout = async (e) => {
    if (e.key === "logout") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/logout-user`,
          null,
          {
            withCredentials: true,
          }
        );
        message.success(response?.data?.message || "Congratulation!");
        navigate("/");
      } catch (error) {
        message.error(
          error?.response?.data?.message || "Something went wrong!"
        );
      }
    }
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider className="hidden sm:block" collapsed={isMobile ? true : false}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["Welcome"]}
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
            <div className="header-left-side flex justify-center items-center gap-4">
              <div className="mobile-menu-btn-container bg-[#f5f5f5] p-1 block sm:hidden">
                <FiMenu
                  size={20}
                  cursor="pointer"
                  onClick={() => openDrawer(drawerContent.content)}
                />
              </div>
              <h2 className="font-medium text-base sm:text-xl hidden sm:block">
                {user?.name}
              </h2>
            </div>
            <div className="header-right">
              <Dropdown
                menu={{
                  items: [{ label: "Logout", key: "logout" }],
                  onClick: handleLogout,
                }}
              >
                <Avatar
                  size="large"
                  src={user?.avatar}
                  icon={<UserOutlined />}
                  className="cursor-pointer"
                />
              </Dropdown>
            </div>
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
      <UserDashboardDrawer
        isOpen={isDrawerVisible}
        onClose={closeDrawer}
        content={drawerContent.content}
      />
    </>
  );
};

export default AdminDashboardPage;
