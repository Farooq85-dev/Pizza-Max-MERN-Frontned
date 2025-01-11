// Libraries Imports
import { useState } from "react";
import PropTypes from "prop-types";
import { message } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";

// Local Imports
import { IoDocumentText } from "react-icons/io5";
import { useUser } from "../Context/User.context";
import { addItemToCart } from "../Redux/Reducers/Cart.reducer";
import { addItemToFavourite } from "../Redux/Reducers/Favourite.reducer";
import Button from "./Button";
import ProductModal from "./Modal";
import ModalProduct from "./ModalProduct";

const ProductCard = ({ product }) => {
  const favouriteItems = useSelector((state) => state.favourite.favourite);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalProduct, setModalProduct] = useState({
    _id: "",
    name: "",
    description: "",
    image: "",
    price: 0,
  });
  const { isUser } = useUser();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleAddToFavourite = (product) => {
    if (!isUser) {
      return message.error(
        "Please login first. If you are not registered. Please registrer yourself!"
      );
    }
    dispatch(addItemToFavourite(product));
  };

  const handleModal = (pd) => {
    setIsModalVisible(!isModalVisible);
    setModalProduct(pd);
  };

  const isFavourite = favouriteItems.some(
    (favourtieProdcts) => favourtieProdcts._id === product._id
  );

  return (
    <div className="product flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="product-image w-full sm:w-32 flex-shrink-0 bg-gray-100 flex items-center justify-center">
        <LazyLoadImage
          className="w-full h-full sm:h-full object-contain"
          effect="blur"
          alt={product?.name}
          src={product?.image}
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <h3 className="text-left text-lg font-semibold text-gray-800">
            {product?.name}
          </h3>
          <p className="text-left text-sm text-gray-600 mt-1 line-clamp-2">
            {product?.description?.slice(0, 20) + "..."}
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
            <span className="text-sm font-bold text-btnColor">
              Rs {product?.price}
            </span>
            {isFavourite ? (
              <FaHeart
                size={20}
                className="text-navbarColor transition cursor-pointer"
                onClick={() => handleAddToFavourite(product)}
              />
            ) : (
              <FaRegHeart
                size={20}
                className="text-btnColor transition cursor-pointer"
                onClick={() => handleAddToFavourite(product)}
              />
            )}
            <IoDocumentText
              size={20}
              className="text-btnColor transition cursor-pointer"
              onClick={() => handleModal(product)}
            />
          </div>
        </div>
      </div>
      <ProductModal
        isVisible={isModalVisible}
        isConfirm={false}
        onClose={handleModal}
        content={<ModalProduct modalProduct={modalProduct} />}
        title={"Product Details"}
      />
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
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
