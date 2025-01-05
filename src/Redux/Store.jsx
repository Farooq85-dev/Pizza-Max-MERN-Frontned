// Libraries Imports
import { configureStore } from "@reduxjs/toolkit";

// Local Imports
import cartSlice from "./Reducers/Cart.reducer";
import favouriteSlice from "./Reducers/Favourite.reducer";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    favourite: favouriteSlice,
  },
});

export default store;
