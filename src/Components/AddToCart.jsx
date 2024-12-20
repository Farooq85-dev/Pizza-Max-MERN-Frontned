import { useCallback, useEffect, useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decQuantity,
  incQuantity,
  removeAllItemFromCart,
  removeItemFromCart,
} from "../Redux/Reducers/Cart";
import Button from "./Button";
import Result from "./Result";
import PopupConfirm from "./PopupConfirm";

const Content = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRemoveItemFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleIncQuantity = useCallback(
    (id) => () => dispatch(incQuantity(id)),
    [dispatch]
  );

  const handleDecQuantity = useCallback(
    (id) => () => dispatch(decQuantity(id)),
    [dispatch]
  );

  return (
    <div>
      {cartItems?.length > 0 ? (
        <div className="cart-product flex flex-col gap-2">
          {cartItems?.map((product) => (
            <div key={product._id}>
              <div className="flex justify-between bg-bodycolor rounded-md p-2 gap-2">
                <div className="cart-image">
                  <img
                    src="https://em-cdn.eatmubarak.pk/55083/dish_image/1717390225.jpg"
                    className="w-24 h-24 rounded-md"
                    alt="loading..."
                  />
                </div>
                <div className="flex flex-col justify-between items-start">
                  <div className="cart-description flex flex-col justify-start">
                    <h4 className="text-base font-semibold">{product?.name}</h4>
                    <h5 className="font-normal">
                      {product?.description.slice(0, 20)}
                    </h5>
                  </div>
                  <div className="cart-quantity flex justify-start items-center gap-2">
                    <div className="dec-btn-container bg-navbarColor rounded-md p-1">
                      <IoIosArrowDown
                        size={20}
                        cursor={"pointer"}
                        color="white"
                        onClick={handleDecQuantity(product?._id)}
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
                        onClick={handleIncQuantity(product?._id)}
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
                      onClick={() => handleRemoveItemFromCart(product?._id)}
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
        <Result
          icon={<ImSpoonKnife size={40} />}
          text="Your cart is empty!"
          btnText="Add items"
          url={"/"}
          isBtn={false}
          className={
            "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base"
          }
        />
      )}
    </div>
  );
};

const Footer = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [subtotal, setSubtotal] = useState(0);
  const dispatch = useDispatch();

  const handleRemoveAllItemFromCart = () => {
    dispatch(removeAllItemFromCart());
  };

  useEffect(() => {
    const price = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(price);
  }, [cartItems]);

  return (
    <>
      {cartItems?.length > 0 && (
        <div className="flex flex-col justify-between items-start gap-1">
          <div className="subtotal-container flex justify-between items-center w-full">
            <h4 className="text-base font-medium">Subtotal</h4>
            <h4 className="text-base font-medium">Rs: {subtotal}</h4>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center w-full gap-2">
            <PopupConfirm
              title="Are you sure you want to clear the cart?"
              onConfirm={handleRemoveAllItemFromCart}
            />
            <Link to={"/checkout"} className="w-full">
              <Button
                title="Checkout"
                id="cart-checkout-btn"
                name="cart-checkout-btn"
                className={
                  "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base w-full"
                }
                type="button"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export { Content, Footer };
