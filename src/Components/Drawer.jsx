import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import { RxCross2 } from "react-icons/rx";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  incQuantity,
  decQuantity,
} from "../Redux/Reducers/Cart";

const DrawerComp = React.memo(({ isOpen, handleDrawer }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [subtotal, setSubtotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const price = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(price);
  }, [cartItems]);

  const handleRemoveItemFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleIncQuantity = (id) => {
    dispatch(incQuantity(id));
  };

  const handleDecQuantity = (id) => {
    dispatch(decQuantity(id));
  };

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
        <div>
          {cartItems?.length > 0 ? (
            <div className="flex flex-col justify-between items-start gap-1">
              <div className="subtotal-container flex justify-between items-center w-full">
                <h4 className="text-base font-medium">Subtotal</h4>
                <h4 className="text-base font-medium">Rs: {subtotal}</h4>
              </div>
              <div className="delivery-container flex justify-between items-center w-full">
                <h4 className="text-base font-medium">Delivery Charges</h4>
                <h4 className="text-base font-medium">
                  Rs: {cartItems?.length <= 4 ? 100 : 150}
                </h4>
              </div>
              <div className="grandtotal-container flex justify-between items-center w-full">
                <h4 className="text-base font-bold">Grand Total</h4>
                <h4 className="text-base font-bold">
                  Rs:
                  {cartItems?.length <= 4 ? subtotal + 100 : subtotal + 150}
                </h4>
              </div>
              <div className="flex justify-between items-center w-full gap-2">
                <Button
                  title="Clear"
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
          ) : null}
        </div>
      }
      open={isOpen}
    >
      {cartItems?.length > 0 ? (
        <div className="cart-product flex flex-col gap-2">
          {cartItems?.map((product) => (
            <div key={product.id}>
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
                    <h4 className="text-xl">{product?.title}</h4>
                    <h5 className="font-medium">{product?.description}</h5>
                  </div>
                  <div className="cart-quantity flex justify-start items-center gap-2">
                    <div className="dec-btn-container bg-navbarColor rounded-md p-1">
                      <IoIosArrowDown
                        size={20}
                        cursor={"pointer"}
                        color="white"
                        onClick={() => handleDecQuantity(product?.id)}
                      />
                    </div>
                    <div className="rounded-md border-2 border-navbarColor text-center text-navbarColor px-2">
                      <span>{product?.quantity}</span>
                    </div>
                    <div className="inc-btn-container bg-navbarColor rounded-md p-1">
                      <IoIosArrowUp
                        size={20}
                        cursor={"pointer"}
                        color="white"
                        onClick={() => handleIncQuantity(product?.id)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="cart-product-rm-btn-container bg-navbarColor rounded-md p-1 text-center">
                    <RxCross2
                      size={20}
                      cursor={"pointer"}
                      color="white"
                      onClick={() => handleRemoveItemFromCart(product?.id)}
                    />
                  </div>
                  <div>
                    <h5 className="text-base font-medium">
                      Rs: {product?.price}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-base sm:text-xl">Please add items to cart!</h1>
      )}
    </Drawer>
  );
});

DrawerComp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};

export default DrawerComp;
