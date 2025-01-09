// Librarires Imports
import { ImSpoonKnife } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import { addItemToCart } from "../../Redux/Reducers/Cart.reducer";
import { removeItemFromFavourite } from "../../Redux/Reducers/Favourite.reducer";
import Button from "../Button";
import Result from "../Result";

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
    <>
      {favouriteItems?.length > 0 ? (
        <div className="favourite-grid-container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {favouriteItems.map((product) => (
            <div
              key={product._id}
              className="favourite-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="favourite-card-image h-40 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <LazyLoadImage
                  className="w-full h-full sm:h-full object-contain"
                  effect="blur"
                  alt={product?.name}
                  src={product?.image}
                />
              </div>
              <div className="favourite-card-content p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-lg font-semibold text-btnColor">
                    Rs {product.price}
                  </span>
                  <Button
                    className="bg-navbarColor text-white rounded-md px-4 py-2 text-sm font-medium"
                    title="Add To Cart"
                    onClick={() => handleAddToCart(product)}
                  />
                  <button
                    className="text-red-500 text-base font-medium hover:text-red-600 transition"
                    onClick={() => handleRemoveFromFavourite(product._id)}
                  >
                    Remove from Favourites
                  </button>
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
    </>
  );
};

export default FavouritesComp;
