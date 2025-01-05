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
    <div className="product flex flex-col sm:flex-row justify-start sm:items-center gap-4 bg-white rounded-xl p-4 shadow-md">
      <div className="product-image flex-shrink-0">
        <LazyLoadImage
          className="rounded-md w-full h-full sm:h-40 sm:w-40 object-cover"
          effect="blur"
          alt={product?.name}
          src={product?.image}
        />
      </div>
      <div className="flex flex-col justify-between gap-4 flex-grow">
        <div>
          <h3 className="text-lg sm:text-xl text-left font-bold">
            {product?.name}
          </h3>
          <p className="text-sm sm:text-base text-left text-gray-600">
            {product?.description?.slice(0, 20) + "..."}
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
            <FaRegHeart
              size={20}
              cursor="pointer"
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
