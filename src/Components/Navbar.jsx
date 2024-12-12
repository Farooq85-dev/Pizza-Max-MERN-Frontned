import { useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import { RiAccountCircle2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Pizza_Max_Logo from "../Assets/Images/pizza-max-logo.png";
import Button from "./Button";
import Modal from "./Modal";
import Account from "./Account";
import DrawerComp from "./Drawer";
import { useSelector } from "react-redux";

const NavbarComp = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);

  const [modalContent, setModalContent] = useState({
    title: "Register/Login",
    content: <Account />,
  });

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(!isModalVisible);
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
              onClick={handleDrawer}
              size={35}
              color="white"
              cursor={"pointer"}
            />
          </div>
        </div>
        <div className="account-btn">
          <RiAccountCircle2Fill
            size={35}
            color="white"
            className="sm:hidden"
            cursor={"pointer"}
            onClick={() => openModal(modalContent.title, modalContent.content)}
          />
          <Button
            className={
              "hidden sm:flex border-2 border-white rounded-md px-4 py-2 text-white font-semibold text-base"
            }
            onClick={() => openModal(modalContent.title, modalContent.content)}
            title={"Register/Login"}
            type={"button"}
            name={"Register/Login"}
            id={"Register/Login"}
          />
        </div>
      </div>
      <DrawerComp isOpen={openDrawer} handleDrawer={handleDrawer} />
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
