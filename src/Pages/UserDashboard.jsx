// Libraries Imports
import { useState, lazy } from "react";
import {
  Avatar,
  Breadcrumb,
  Dropdown,
  Layout,
  Menu,
  message,
  theme,
} from "antd";
import { BsBox2HeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { GiBoxUnpacking } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { SiWelcometothejungle } from "react-icons/si";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/User.context";
import axios from "axios";

// Local Imports
const Welcome = lazy(() => import("../Components/Welcome"));
const Orders = lazy(() => import("../Components/User/Orders"));
const Favourites = lazy(() => import("../Components/User/Favourites"));
const Profile = lazy(() => import("../Components/User/Profile"));
const DashboardDrawer = lazy(() => import("../Components/DashboardDrawer"));
import "./UserDashboard.scss";

function getItem(label, key, icon) {
  return { key, icon, label };
}

// Menu Items
const menuItems = [
  getItem("Welcome", "Welcome", <SiWelcometothejungle />),
  getItem("Orders", "Orders", <GiBoxUnpacking />),
  getItem("Favourites", "Favourites", <BsBox2HeartFill />),
  getItem("Profile", "Profile", <CgProfile />),
];

const UserDashboardPage = () => {
  const [selectedKey, setSelectedKey] = useState("Welcome");
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([
    { title: "User" },
    { title: "Welcome" },
  ]);
  const user = useUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle menu click
  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    setBreadcrumb([{ title: "User" }, { title: key }]);
  };

  // Handle Drawer on mobile screen
  const handleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "Welcome":
        return <Welcome />;
      case "Orders":
        return <Orders />;
      case "Favourites":
        return <Favourites />;
      case "Profile":
        return <Profile />;
      default:
        return <h1>Sorry! this page {"doesn't"} exist</h1>;
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
                {user?.user?.name}
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
                  src={user?.user?.avatar}
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

export default UserDashboardPage;
