import { Link } from "react-scroll";
import { categories } from "../Db/products";

const CategoryBarComp = () => {
  return (
    <div className="relative p-4 sm:px-10">
      <div
        className="categories flex lg:justify-center lg:items-center gap-8 overflow-x-scroll cursor-grab
          [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-scrollBarColor
  [&::-webkit-scrollbar-thumb]:rounded-md
  [&::-webkit-scrollbar-thumb]:bg-gray-300
          px-12 py-2"
      >
        {categories?.map((category) => (
          <Link
            className="text-base sm:text-xl text-center font-semibold whitespace-nowrap cursor-pointer"
            to={category.id}
            smooth={true}
            duration={1200}
            key={category.id}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBarComp;
