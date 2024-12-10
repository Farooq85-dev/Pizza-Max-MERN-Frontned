import { Drawer } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";

const DrawerComp = React.memo(({ isOpen, handleDrawer }) => {
  const greateThanSmallScreen = useMediaQuery({
    query: "(min-width: 576px)",
  });

  const lessThanSmallScreen = useMediaQuery({
    query: "(max-width: 576px)",
  });

  return (
    <Drawer
      title="Your Cart"
      placement={
        (greateThanSmallScreen && "right") || (lessThanSmallScreen && "bottom")
      }
      className="rounded-l-xl"
      width={400}
      onClose={handleDrawer}
      footer={
        <div className="flex flex-col justify-between items-start gap-1">
          <div className="subtotal-container flex justify-between items-center w-full">
            <h4 className="text-base font-medium">Subtotal</h4>
            <h4 className="text-base font-medium">Rs: 1400</h4>
          </div>
          <div className="delivery-container flex justify-between items-center w-full">
            <h4 className="text-base font-medium">Delivery Charges</h4>
            <h4 className="text-base font-medium">Rs: 100</h4>
          </div>
          <div className="grandtotal-container flex justify-between items-center w-full">
            <h4 className="text-base font-bold">Grand Total</h4>
            <h4 className="text-base font-bold">Rs: 1500</h4>
          </div>
          <div className="flex justify-between items-center w-full gap-2">
            <Button
              title="Clear Cart"
              id="clear-cart-btn"
              name="clear-cart-btn"
              className={
                "border-2 border-red-600 rounded-md px-4 py-2 font-semibold text-red-600 text-base w-full"
              }
              type="button"
            />
            <Button
              title="Checkout"
              id="cart-checkout-btn"
              name="cart-checkout-btn"
              className={
                "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-full"
              }
              type="button"
            />
          </div>
        </div>
      }
      open={isOpen}
    >
      <div className="cart-product flex flex-col gap-2">
        <div className="flex justify-between bg-scrollBarColor rounded-md p-2 gap-2">
          <div className="cart-image">
            <img
              src="https://em-cdn.eatmubarak.pk/55083/dish_image/1717390225.jpg"
              className="w-24 h-24 rounded-md"
              alt="loading..."
            />
          </div>
          <div className="flex flex-col justify-between items-start">
            <div className="cart-description flex flex-col justify-start">
              <h4 className="text-xl">Burgor Combo</h4>
              <h5 className="font-medium">Burgor Combo</h5>
            </div>
            <div className="cart-quantity flex justify-start items-center gap-2">
              <div className="dec-btn-container bg-navbarColor rounded-md p-1">
                <IoIosArrowDown size={20} cursor={"pointer"} color="white" />
              </div>
              <div className="rounded-md border-2 border-navbarColor text-center text-navbarColor px-2">
                <span>01</span>
              </div>
              <div className="inc-btn-container bg-navbarColor rounded-md p-1">
                <IoIosArrowUp size={20} cursor={"pointer"} color="white" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div className="cart-product-rm-btn-container bg-navbarColor rounded-md p-1 text-center">
              <RxCross2 size={20} cursor={"pointer"} color="white" />
            </div>
            <div>
              <h5 className="text-base font-medium">Rs: 1099 </h5>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
});

DrawerComp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};

export default DrawerComp;
