import { NavLink } from "react-router-dom";

const categories = [
  {
    id: "1",
    title: "Promo Deals",
    icon: "🔥",
    description: "Special discounts on selected items.",
  },
  {
    id: "2",
    title: "Max Value Deals",
    icon: "💸",
    description: "Get the best value for your money.",
  },
  {
    id: "3",
    title: "Royal Clown Pizza",
    icon: "🍕",
    description: "Delicious pizzas for every taste.",
  },
  {
    id: "4",
    title: "Chicken Pizza",
    icon: "🍗",
    description: "Savor the flavor of our chicken pizzas.",
  },
  {
    id: "5",
    title: "Sandwiches",
    icon: "🥪",
    description: "Freshly made sandwiches just for you.",
  },
  {
    id: "6",
    title: "Pastas",
    icon: "🍝",
    description: "Authentic Italian pasta dishes.",
  },
  {
    id: "7",
    title: "Max Platter",
    icon: "🍽️",
    description: "Enjoy a full platter of delights.",
  },
];

const CategoryBarComp = () => {
  return (
    <>
      <div className="relative px-4 py-4 shadow-md">
        <div
          className="categories flex justify-center items-center gap-8 overflow-x-auto 
          [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-md
  [&::-webkit-scrollbar-thumb]:bg-gray-300
          px-12 py-2"
        >
          {categories.map((category) => (
            <NavLink
              className="text-base sm:text-xl font-semibold whitespace-nowrap"
              to={`#${category.id}`}
              key={category.id}
            >
              {category.title}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryBarComp;
