import PropTypes from "prop-types";
import Button from "./Button";

const ProductCard = ({ productTitle, productDescription, productPrice }) => {
  return (
    <>
      <div className="products-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div className="product-container flex flex-col sm:flex-row justify-start sm:items-center gap-2 sm:gap-8 bg-white rounded-lg shadow-lg p-4">
          <div className="left-side ">
            <div className="product-image">
              <img
                className="rounded-md w-full h-full sm:h-48 sm:w-48 object-cover"
                src="https://em-cdn.eatmubarak.pk/55083/dish_image/1717390225.jpg"
                alt={`${productTitle}`}
              />
            </div>
          </div>
          <div className="right-side h-full flex flex-col justify-between items-start gap-2 sm:gap-0">
            <div className="product-detail">
              <h3 className="text-base sm:text-xl font-bold">{productTitle}</h3>
              <h4 className="text-base sm:text-lg font-normal">
                {productDescription}
              </h4>
            </div>
            <div className="product-price w-full flex flex-col justify-start gap-2">
              <h5 className="text-base sm:text-lg text-center bg-btnColor text-white rounded-md py-1 px-2">
                Rs {productPrice}
              </h5>
              <Button
                className="bg-navbarColor rounded-md px-4 py-2 text-white text-base font-semibold w-full"
                title="Add To Cart"
                id="add-to-cart"
                type="button"
                name="Add To Cart"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  productTitle: PropTypes.string.isRequired,
  productDescription: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
};

export default ProductCard;
