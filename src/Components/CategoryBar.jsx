// Libraries Imports
import { useRef } from "react";
import { Link } from "react-scroll";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

// Local Imports
import { useProducts } from "../Context/Products";
import { Skeleton } from "antd";

const CategoryBarComp = () => {
  const { products, isLoading } = useProducts();
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollAmount = 100;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative p-6 sm:px-20">
      <div className="relative flex items-center">
        <button
          onClick={() => handleScroll("left")}
          className="block absolute left-0 z-40 bg-white p-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <MdArrowBackIos size={16} name="category-scrollbar-previous-btn" />
        </button>
        <div
          ref={scrollRef}
          className="categories flex lg:justify-center lg:items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide 
          [&::-webkit-scrollbar]:hidden px-12 py-2 bg-bodycolor w-full"
        >
          {isLoading ? (
            <Skeleton.Input active />
          ) : (
            <>
              {products?.map((category) => (
                <Link
                  className="text-base sm:text-xl text-center font-semibold whitespace-nowrap cursor-pointer hover:text-primary transition-colors"
                  to={category?.category}
                  smooth={true}
                  duration={1200}
                  activeClass="active-category"
                  spy={true}
                  key={category?.category}
                >
                  {category?.category}
                </Link>
              ))}
            </>
          )}
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="block absolute right-0 z-40 bg-white p-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          <MdArrowForwardIos size={16} name="category-scrollbar-next-btn" />
        </button>
      </div>
    </div>
  );
};

export default CategoryBarComp;
