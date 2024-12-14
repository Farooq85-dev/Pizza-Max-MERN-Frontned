import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Reducers/Cart";
import favouriteSlice from "./Reducers/Favourite";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    favourite: favouriteSlice,
  },
});

export default store;
