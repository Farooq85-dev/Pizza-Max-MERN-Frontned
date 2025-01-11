import React from "react";
import PropTypes from "prop-types";

const ModalProductComp = React.memo(({ modalProduct }) => {
  return (
    <div className="modal-product-container max-w-4xl mx-auto bg-bodyColor">
      <div className="flex flex-col gap-8">
        <div>
          <img
            loading="lazy"
            src={modalProduct?.image}
            alt={modalProduct?.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-2 !w-full">
          <h1 className="text-3xl font-bold text-gray-800">
            {modalProduct?.name}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {modalProduct?.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
            <span className="text-2xl font-bold text-btnColor">
              Rs {modalProduct?.price}
            </span>
            <span
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                modalProduct?.stock > 0
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {modalProduct?.stock > 0
                ? `In Stock: ${modalProduct?.stock}`
                : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

ModalProductComp.propTypes = {
  modalProduct: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ModalProductComp;
