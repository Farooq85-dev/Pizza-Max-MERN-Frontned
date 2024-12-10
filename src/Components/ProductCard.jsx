import PropTypes from "prop-types";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../Redux/Reducers/Cart";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-8 bg-white rounded-xl p-4">
      <div className="left-side">
        <div className="product-image">
          <img
            className="rounded-md w-full h-full sm:h-40 sm:w-40 object-cover"
            src="https://em-cdn.eatmubarak.pk/55083/dish_image/1717390225.jpg"
            alt="loading..."
          />
        </div>
      </div>
      <div className="right-side h-full flex flex-col justify-between items-start gap-2 sm:gap-0">
        <div className="product-detail">
          <h3 className="text-base sm:text-xl font-bold">{product.title}</h3>
          <h4 className="text-base sm:text-lg font-normal">
            {product.description}
          </h4>
        </div>
        <div className="product-price w-full flex flex-col justify-start gap-2">
          <h5 className="text-base sm:text-lg text-center bg-btnColor text-white rounded-md py-1 px-2">
            Rs {product.price}
          </h5>
          <Button
            className="bg-navbarColor rounded-md px-4 py-2 text-white text-base font-semibold w-full"
            title="Add To Cart"
            id="add-to-cart-btn"
            type="button"
            name="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
          />
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
