import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialFavouriteState =
  JSON.parse(localStorage.getItem("favourite")) || [];

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: { favourite: initialFavouriteState },
  reducers: {
    addItemToFavourite: (state, action) => {
      const isFavouriteProductExists = state?.favourite?.find(
        (product) => product?.id === action?.payload?.id
      );
      if (isFavouriteProductExists) {
        message.error("Product already exists in your favourites products!");
      } else {
        state.favourite.push(action.payload);
        localStorage.setItem("favourite", JSON.stringify(state.favourite));
        message.success("Product added to favourites!");
      }
    },
    removeItemFromFavourite: (state, action) => {
      state.favourite = state?.favourite?.filter(
        (product) => product.id !== action?.payload?.id
      );
      localStorage.setItem("favourite", JSON.stringify(state?.favourite));
      message.success("Product removed successfuly!");
    },
    removeAllItemsFromFavourite: (state) => {
      localStorage.removeItem("favourite");
      state.favourite = [];
      message.success("All products removed successfuly!");
    },
  },
});

export const {
  addItemToFavourite,
  removeItemFromFavourite,
  removeAllItemsFromFavourite,
} = favouriteSlice.actions;
export default favouriteSlice.reducer;
