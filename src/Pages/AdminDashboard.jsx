// Libraries Imports
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
import { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { AiFillProduct } from "react-icons/ai";
import { FaRegUserCircle, FaUserShield } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GiBoxUnpacking } from "react-icons/gi";
import { LuUsersRound } from "react-icons/lu";
import { SiWelcometothejungle } from "react-icons/si";

// Local Imports
import { useUser } from "../Context/User.context";
const Welcome = lazy(() => import("../Components/Welcome"));
const Products = lazy(() => import("../Components/Admin/Products"));
const Orders = lazy(() => import("../Components/Admin/Orders"));
const Users = lazy(() => import("../Components/Admin/Users"));
const Profile = lazy(() => import("../Components/Admin/Profile"));
const DashboardDrawer = lazy(() => import("../Components/DashboardDrawer"));

function getItem(label, key, icon) {
  return { key, icon, label };
}

// Menu Items
const menuItems = [
  getItem("Welcome", "Welcome", <SiWelcometothejungle />),
  getItem("Products", "Products", <AiFillProduct />),
  getItem("Orders", "Orders", <GiBoxUnpacking />),
  getItem("Users", "Users", <LuUsersRound />),
  getItem("Profile", "Profile", <FaUserShield />),
];

const AdminDashboardPage = () => {
  const [selectedKey, setSelectedKey] = useState("Welcome");
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([
    { title: "Admin" },
    { title: "Welcome" },
  ]);

  const { user } = useUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle menu click
  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    setBreadcrumb([{ title: "Admin" }, { title: key }]);
  };

  // Handle Drawer on mobile screen
  const handleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "Welcome":
        return <Welcome />;
      case "Products":
        return <Products />;
      case "Orders":
        return <Orders />;
      case "Users":
        return <Users />;
      case "Profile":
        return <Profile />;
      default:
        return <h1>Sorry! that page {"doesn't"} exist</h1>;
    }
  };

  const handleLogout = async (e) => {
    if (e.key === "logout") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/user/logout`,
          {},
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
        <Layout.Sider
          className="hidden sm:block"
          collapsed={isMobile ? true : false}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["Welcome"]}
            mode="inline"
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Layout.Sider>
        <Layout>
          <Layout.Header
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
                <FiMenu size={20} cursor="pointer" onClick={handleDrawer} />
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
                  icon={<FaRegUserCircle />}
                  className="cursor-pointer"
                />
              </Dropdown>
            </div>
          </Layout.Header>
          <Layout.Content style={{ margin: "16px" }}>
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
          </Layout.Content>
        </Layout>
      </Layout>
      <DashboardDrawer
        isOpen={isDrawerVisible}
        onClose={handleDrawer}
        content={
          <Menu
            theme="dark"
            defaultSelectedKeys={["Welcome"]}
            mode="inline"
            items={menuItems}
            onClick={handleMenuClick}
          />
        }
      />
    </>
  );
};

export default AdminDashboardPage;
