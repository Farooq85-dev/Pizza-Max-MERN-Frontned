import { createSlice } from "@reduxjs/toolkit";

const initialCartState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: initialCartState,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const isCartProductExists = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (isCartProductExists) {
        alert("Product Already Exists!");
      } else {
        state.cart.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeAllItemFromCart: (state) => {
      localStorage.removeItem("cart");
      state.cart = [];
    },
    incQuantity: (state, action) => {
      const updatedItem = state.cart.find(
        (product) => product.id === action.payload
      );

      if (updatedItem.quantity >= 1) {
        updatedItem.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decQuantity: (state, action) => {
      const updatedItem = state.cart.find(
        (product) => product.id === action.payload
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
