import { createSlice } from "@reduxjs/toolkit";

const initialFavouriteState =
  JSON.parse(localStorage.getItem("favourite")) || [];

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: { favourite: initialFavouriteState },
  reducers: {
    addItemToFavourite: (state, action) => {
      console.log(action.payload);
      const isFavouriteProductExists = state?.favourite?.find(
        (product) => product?.id === action?.payload?.id
      );
      if (isFavouriteProductExists) {
        alert("Product Already Exists!");
      } else {
        state.favourite.push(action.payload);
        localStorage.setItem("favourite", JSON.stringify(state.favourite));
      }
    },
    removeItemFromFavourite: (state, action) => {
      state.favourite = state?.favourite?.filter(
        (product) => product.id !== action?.payload?.id
      );
      localStorage.setItem("favourite", JSON.stringify(state?.favourite));
    },
    removeAllItemsFromFavourite: (state) => {
      localStorage.removeItem("favourite");
      state.favourite = [];
    },
  },
});

export const {
  addItemToFavourite,
  removeItemFromFavourite,
  removeAllItemsFromFavourite,
} = favouriteSlice.actions;
export default favouriteSlice.reducer;
