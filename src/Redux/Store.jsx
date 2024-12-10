import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Reducers/Cart";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
