import PropTypes from "prop-types";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../Redux/Reducers/Cart";
import Button from "./Button";
import { addItemToFavourite } from "../Redux/Reducers/Favourite";

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
        <img
          className="rounded-md w-full sm:h-32 sm:w-32 object-cover"
          src="https://em-cdn.eatmubarak.pk/55083/dish_image/1717390225.jpg"
          alt={product.title || "Product image"}
        />
      </div>
      <div className="flex flex-col justify-between gap-4 flex-grow">
        <div>
          <h3 className="text-lg sm:text-xl font-bold">{product.title}</h3>
          <p className="text-sm sm:text-base text-gray-600">
            {product.description}
          </p>
        </div>
        <div className="flex flex-row justify-between items-end gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-base text-center bg-btnColor text-white rounded-md py-1 px-2">
              Rs {product.price}
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
  product: PropTypes.object,
};

export default ProductCard;
