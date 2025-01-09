// Librarires Imports
import { IoIosHeartDislike } from "react-icons/io";
import { ImSpoonKnife } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import { addItemToCart } from "../../Redux/Reducers/Cart.reducer";
import { removeItemFromFavourite } from "../../Redux/Reducers/Favourite.reducer";
import Result from "../Result";
import Button from "../Button";

const FavouritesComp = () => {
  const favouriteItems = useSelector((state) => state.favourite.favourite);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleRemoveFromFavourite = (id) => {
    dispatch(removeItemFromFavourite(id));
  };

  return (
    <div>
      {favouriteItems?.length > 0 ? (
        <div className="favourite-product-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favouriteItems?.map((product) => (
            <div
              key={product?._id}
              className="flex flex-col justify-start gap-4 bg-white rounded-md p-4 shadow-md"
            >
              <div className="product-image flex-shrink-0">
                <img
                  className="rounded-md w-full object-cover"
                  src={product?.image}
                  alt={product?.name}
                />
              </div>
              <div className="flex flex-col justify-between gap-4 flex-grow">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {product?.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {product?.description}
                  </p>
                </div>
                <div className="flex flex-row justify-between items-end gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-base text-center bg-btnColor text-white rounded-md py-1 px-2">
                      Rs {product?.price}
                    </span>
                    <Button
                      className="bg-navbarColor rounded-md px-4 py-2 text-white text-base font-semibold"
                      title="Add To Cart"
                      id="add-to-cart-btn"
                      type="button"
                      name="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                  <div className="favourite-btn-container">
                    <IoIosHeartDislike
                      size={20}
                      cursor="pointer"
                      onClick={() => handleRemoveFromFavourite(product?._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Result
          icon={<ImSpoonKnife size={40} />}
          text="There is nothing in favourites!"
          btnText="Add to Favourites"
          url={"/"}
          isBtn={true}
          className={
            "border-2 border-navbarColor bg-navbarColor rounded-md px-4 py-2 font-semibold text-white text-base"
          }
        />
      )}
    </div>
  );
};

export default FavouritesComp;
