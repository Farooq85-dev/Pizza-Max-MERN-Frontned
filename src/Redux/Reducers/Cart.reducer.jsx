// Libraries Imports
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

// Cart Initial State
const initialCartState = JSON.parse(localStorage.getItem("cart")) || [];

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: initialCartState,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const isCartProductExists = state.cart.find(
        (product) => product?._id === action?.payload?._id
      );

      const data = {
        ...action.payload,
        quantity: 1,
      };

      if (isCartProductExists) {
        message.error("Product already exists in cart!");
      } else {
        state.cart.push(data);
        localStorage.setItem("cart", JSON.stringify(state.cart));
        message.success("Product added to cart successfully!");
      }
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product?._id !== action?.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
      message.success("Product removed successfully!");
    },
    removeAllItemFromCart: (state) => {
      localStorage.removeItem("cart");
      state.cart = [];
      message.success("All Products removed successfully!");
    },
    incQuantity: (state, action) => {
      const updatedItem = state.cart.find(
        (product) => product._id === action?.payload
      );

      if (updatedItem.quantity >= 1) {
        updatedItem.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decQuantity: (state, action) => {
      const updatedItem = state.cart.find(
        (product) => product?._id === action?.payload
      );

      if (updatedItem.quantity > 1) {
        updatedItem.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  removeAllItemFromCart,
  incQuantity,
  decQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
