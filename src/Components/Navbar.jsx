import { useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { RiAccountCircle2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pizza_Max_Logo from "../Assets/Images/pizza-max-logo.png";
import Account from "./Account";
import { Content, Footer } from "./AddToCart";
import Button from "./Button";
import Drawer from "./Drawer";
import Modal from "./Modal";
import { useMediaQuery } from "react-responsive";
import { useUser } from "../Context/User.context";

const NavbarComp = () => {
  const { user } = useUser();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  const [modalContent, setModalContent] = useState({
    title: "Register/Login",
    content: <Account />,
  });

  const [drawerContent, setDrawerContent] = useState({
    title: "Your Cart",
    content: <Content />,
    footer: <Footer />,
  });

  // Cart Drawer
  const openDrawer = (title, content, footer) => {
    setDrawerContent({ title, content, footer });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Account Modal
  const openModal = (title, content) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="navbar flex justify-between items-center h-20 fixed top-0 z-50 bg-navbarColor p-4 sm:px-10 w-full">
      <div className="left-side-navbar flex justify-center items-center">
        <div className="logo">
          <Link to={"/"}>
            <img
              src={Pizza_Max_Logo}
              loading="lazy"
              alt="Pizza-Max"
              className="h-12 w-12 sm:w-16 sm:h-16 cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <div className="right-side-navbar flex justify-center items-center gap-4 sm:gap-8">
        <div className="cart-container relative">
          <div className="cart-status absolute bottom-6 left-7 text-center font-bold text-white h-6 w-6 border-2 border-white rounded-lg">
            {cartItems.length}
          </div>
          <div className="cart-icon">
            <MdShoppingBag
              onClick={() =>
                openDrawer(
                  drawerContent.title,
                  drawerContent.content,
                  drawerContent.footer
                )
              }
              size={35}
              color="white"
              cursor={"pointer"}
            />
          </div>
        </div>
        <div className="account-btn">
          {user ? (
            <>
              <Link to="/user">
                <RiAccountCircle2Fill
                  size={35}
                  color="white"
                  className="sm:hidden"
                  cursor={"pointer"}
                />
              </Link>
              <Link to="/user">
                <Button
                  className={
                    "hidden sm:flex border-2 border-white rounded-md px-4 py-2 text-white font-semibold text-base"
                  }
                  title={"Dashbaord"}
                  type={"button"}
                  name={"Register/Login"}
                  id={"Register/Login"}
                />
              </Link>
            </>
          ) : (
            <>
              <RiAccountCircle2Fill
                size={35}
                color="white"
                className="sm:hidden"
                cursor={"pointer"}
                onClick={() =>
                  openModal(modalContent.title, modalContent.content)
                }
              />
              <Button
                className={
                  "hidden sm:flex border-2 border-white rounded-md px-4 py-2 text-white font-semibold text-base"
                }
                onClick={() =>
                  openModal(modalContent.title, modalContent.content)
                }
                title={"Register/Login"}
                type={"button"}
                name={"Register/Login"}
                id={"Register/Login"}
              />
            </>
          )}
        </div>
      </div>
      <Drawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        title={drawerContent.title}
        content={drawerContent.content}
        footer={drawerContent.footer}
        placement={isMobile ? "bottom" : "right"}
      />
      <Modal
        isConfirm={false}
        isVisible={isModalVisible}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
      />
    </div>
  );
};

export default NavbarComp;
