// Libraries Imports
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";

// Local Imports
import { addItemToCart } from "../Redux/Reducers/Cart.reducer";
import { addItemToFavourite } from "../Redux/Reducers/Favourite.reducer";
import Button from "./Button";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleAddToFavourite = (product) => {
    dispatch(addItemToFavourite(product));
  };

  return (
    <div className="product flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="product-image w-full sm:w-40 flex-shrink-0 bg-gray-100 flex items-center justify-center">
        <LazyLoadImage
          className="w-full h-full sm:h-full object-contain"
          effect="blur"
          alt={product?.name}
          src={product?.image}
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">
            {product?.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product?.description}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="flex items-center justify-between gap-3">
            <Button
              className="bg-navbarColor text-white text-sm px-3 py-1 rounded-lg hover:bg-opacity-90 transition"
              title="Add To Cart"
              id="add-to-cart-btn"
              type="button"
              name="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            />
            <span className="text-lg font-bold text-btnColor">
              Rs {product?.price}
            </span>
            <FaRegHeart
              size={20}
              className="text-gray-500 hover:text-red-500 transition cursor-pointer"
              onClick={() => handleAddToFavourite(product)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
