// Libraries Imports
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdShoppingBag } from "react-icons/md";
import { RiAccountCircle2Fill } from "react-icons/ri";

// Local Imports
import { useUser } from "../Context/User";
import LoginRegister from "./LoginRegister";
import Modal from "./Modal";
import AddToCartDrawer from "./AddToCartDrawer";
import Button from "./Button";
import Pizza_Max_Logo from "../Assets/Images/pizza-max-logo.webp";

const NavbarComp = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const { user } = useUser();

  // Cart Drawer
  const handleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  // Account Modal
  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div className="navbar flex justify-between items-center h-20 fixed top-0 z-50 bg-navbarColor p-6 sm:px-20 w-full">
      <div className="left-side-navbar flex justify-center items-center">
        <div className="logo">
          <Link to="/">
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
              cursor="pointer"
            />
          </div>
        </div>
        <div className="account-btn">
          {user ? (
            <>
              <Link to={user && user?.role === "user" ? "/user" : "/admin"}>
                <RiAccountCircle2Fill
                  size={35}
                  color="white"
                  className="sm:hidden"
                  cursor="pointer"
                />
              </Link>
              <Link to={user && user?.role === "user" ? "/user" : "/admin"}>
                <Button
                  className="hidden sm:flex border-2 border-white rounded-md px-4 py-2 text-white font-semibold text-base"
                  title="Dashbaord"
                  type="button"
                  name="Register/Login"
                  id="Register/Login"
                />
              </Link>
            </>
          ) : (
            <>
              <RiAccountCircle2Fill
                size={35}
                color="white"
                className="sm:hidden"
                cursor="pointer"
                onClick={handleModal}
              />
              <Button
                className="hidden sm:flex border-2 border-white rounded-md px-4 py-2 text-white font-semibold text-base"
                onClick={handleModal}
                title="Register/Login"
                type="button"
                name="Register/Login"
                id="Register/Login"
              />
            </>
          )}
        </div>
      </div>
      <AddToCartDrawer handleDrawer={handleDrawer} isOpen={isDrawerVisible} />
      <Modal
        isConfirm={false}
        isVisible={isModalVisible}
        onClose={handleModal}
        title="Register/Login"
        content={<LoginRegister />}
      />
    </div>
  );
};

export default NavbarComp;
