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
import { BsBox2HeartFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { GiBoxUnpacking } from "react-icons/gi";
import { SiWelcometothejungle } from "react-icons/si";
import { useMediaQuery } from "react-responsive";
import Drawer from "../Components/Drawer";
import Favourites from "../Components/User/Favourites";
import Orders from "../Components/User/Orders";
import Account from "../Components/User/Profile";
import Welcome from "../Components/User/Welcome";
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
import { useUser } from "../Context/User.context";
import "./user-dashboard.scss";

// Define menu items
function getItem(label, key, icon) {
  return { key, icon, label };
}

const menuItems = [
  getItem("Welcome", "Welcome", <SiWelcometothejungle />),
  getItem("Orders", "Orders", <GiBoxUnpacking />),
  getItem("Favourites", "Favourites", <BsBox2HeartFill />),
  getItem("Account", "Account", <CgProfile />),
];

const UserDashboardPage = () => {
  const [selectedKey, setSelectedKey] = useState("Welcome");
  const [breadcrumb, setBreadcrumb] = useState([
    { title: "User" },
    { title: "Welcome" },
  ]);
  const user = useUser();

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle menu click
  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    setBreadcrumb([{ title: "User" }, { title: key }]);
  };

  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState({
    title: "Menu",
    content: (
      <Menu
        theme="dark"
        defaultSelectedKeys={["Welcome"]}
        mode="inline"
        items={menuItems}
        onClick={handleMenuClick}
      />
    ),
    footer: <></>,
  });

  // Handle Drawer on mobile screen
  const openDrawer = (title, content, footer) => {
    setDrawerContent({ title, content, footer });
    setDrawerVisible(!isDrawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });

  const renderContent = () => {
    switch (selectedKey) {
      case "Welcome":
        return <Welcome />;
      case "Orders":
        return <Orders />;
      case "Favourites":
        return <Favourites />;
      case "Account":
        return <Account />;
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
              <div className="mobile-menu-btn-container bg-[#f5f5f5] p-2 block sm:hidden">
                <FiMenu
                  size={20}
                  cursor="pointer"
                  onClick={() =>
                    openDrawer(
                      drawerContent.title,
                      drawerContent.content,
                      drawerContent.footer
                    )
                  }
                />
              </div>
              <h2 className="font-medium text-base sm:text-xl hidden sm:block">
                Muhammad Farooq
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
      <Drawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        title={drawerContent.title}
        content={drawerContent.content}
        footer={drawerContent.footer}
        placement={"left"}
      />
    </>
  );
};

export default UserDashboardPage;
