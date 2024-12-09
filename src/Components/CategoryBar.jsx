import ProductCard from "./ProductCard";
import { Link } from "react-scroll";

const categories = [
  {
    id: "1",
    title: "Promo Deals",
    icon: "🔥",
    description: "Special discounts on selected items.",
    products: [
      {
        id: "p1",
        title: "Burger Combo",
        price: 500,
        description: "Burger with fries and drink.",
      },
      {
        id: "p2",
        title: "Medium Pizza",
        price: 800,
        description: "Cheese burst pizza.",
      },
      {
        id: "p3",
        title: "Family Pack",
        price: 1500,
        description: "Combo for the whole family.",
      },
      {
        id: "p4",
        title: "Double Cheese Deal",
        price: 900,
        description: "Extra cheesy pizza deal.",
      },
      {
        id: "p5",
        title: "Beverage Bundle",
        price: 200,
        description: "Soft drinks for 2.",
      },
    ],
  },
  {
    id: "2",
    title: "Max Value Deals",
    icon: "💸",
    description: "Get the best value for your money.",
    products: [
      {
        id: "p1",
        title: "Saver Pizza",
        price: 600,
        description: "Budget-friendly pizza.",
      },
      {
        id: "p2",
        title: "Chicken Wrap",
        price: 300,
        description: "Loaded chicken wrap.",
      },
      {
        id: "p3",
        title: "Party Platter",
        price: 2000,
        description: "Ideal for gatherings.",
      },
      {
        id: "p4",
        title: "Mix Grill",
        price: 1200,
        description: "Chicken and mutton combo.",
      },
      {
        id: "p5",
        title: "Dessert Delight",
        price: 400,
        description: "Cake slice with ice cream.",
      },
    ],
  },
  {
    id: "3",
    title: "Royal Clown Pizza",
    icon: "🍕",
    description: "Delicious pizzas for every taste.",
    products: [
      {
        id: "p1",
        title: "Margherita Pizza",
        price: 700,
        description: "Classic cheesy pizza.",
      },
      {
        id: "p2",
        title: "Pepperoni Pizza",
        price: 900,
        description: "Loaded with pepperoni.",
      },
      {
        id: "p3",
        title: "Veg Supreme",
        price: 750,
        description: "Healthy veggie toppings.",
      },
      {
        id: "p4",
        title: "BBQ Chicken Pizza",
        price: 1000,
        description: "Smoky BBQ chicken.",
      },
      {
        id: "p5",
        title: "Deluxe Feast",
        price: 1200,
        description: "Fully loaded feast.",
      },
    ],
  },
  {
    id: "4",
    title: "Chicken Pizza",
    icon: "🍗",
    description: "Savor the flavor of our chicken pizzas.",
    products: [
      {
        id: "p1",
        title: "Spicy Chicken",
        price: 800,
        description: "For spice lovers.",
      },
      {
        id: "p2",
        title: "Creamy Chicken",
        price: 850,
        description: "Rich creamy topping.",
      },
      {
        id: "p3",
        title: "Grilled Chicken",
        price: 900,
        description: "Chargrilled perfection.",
      },
      {
        id: "p4",
        title: "Chicken Fajita",
        price: 950,
        description: "Mexican-inspired flavor.",
      },
      {
        id: "p5",
        title: "Cheesy Chicken",
        price: 1000,
        description: "Cheese and chicken combo.",
      },
    ],
  },
  {
    id: "5",
    title: "Sandwiches",
    icon: "🥪",
    description: "Freshly made sandwiches just for you.",
    products: [
      {
        id: "p1",
        title: "Club Sandwich",
        price: 400,
        description: "Triple-layered classic.",
      },
      {
        id: "p2",
        title: "Grilled Sandwich",
        price: 350,
        description: "Golden grilled perfection.",
      },
      {
        id: "p3",
        title: "Egg Sandwich",
        price: 300,
        description: "Simple and healthy.",
      },
      {
        id: "p4",
        title: "Chicken Panini",
        price: 450,
        description: "Pressed chicken delight.",
      },
      {
        id: "p5",
        title: "Veggie Delight",
        price: 320,
        description: "Fresh garden veggies.",
      },
    ],
  },
  {
    id: "6",
    title: "Pastas",
    icon: "🍝",
    description: "Authentic Italian pasta dishes.",
    products: [
      {
        id: "p1",
        title: "Spaghetti Bolognese",
        price: 600,
        description: "Rich meat sauce.",
      },
      {
        id: "p2",
        title: "Penne Alfredo",
        price: 550,
        description: "Creamy white sauce.",
      },
      {
        id: "p3",
        title: "Veggie Pasta",
        price: 500,
        description: "Healthy veggie mix.",
      },
      {
        id: "p4",
        title: "Seafood Pasta",
        price: 850,
        description: "Loaded with seafood.",
      },
      {
        id: "p5",
        title: "Chicken Carbonara",
        price: 700,
        description: "Creamy chicken pasta.",
      },
    ],
  },
  {
    id: "7",
    title: "Max Platter",
    icon: "🍽️",
    description: "Enjoy a full platter of delights.",
    products: [
      {
        id: "p1",
        title: "Mixed Grill",
        price: 1500,
        description: "Variety of meats.",
      },
      {
        id: "p2",
        title: "Family Feast",
        price: 2500,
        description: "Feeds the whole family.",
      },
      {
        id: "p3",
        title: "Seafood Platter",
        price: 2000,
        description: "Fish, prawns, and more.",
      },
      {
        id: "p4",
        title: "BBQ Platter",
        price: 1800,
        description: "Smoky BBQ flavors.",
      },
      {
        id: "p5",
        title: "Veggie Platter",
        price: 1200,
        description: "Fresh and healthy.",
      },
    ],
  },
];

const CategoryBarComp = () => {
  return (
    <>
      <div className="relative px-4 py-4">
        <div
          className="categories flex lg:justify-center lg:items-center gap-8 overflow-x-scroll cursor-grab
          [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
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
        <div className="mt-8">
          {categories?.map((category) => (
            <div
              id={category.id}
              key={category.id}
              className="category-section py-4 md:py-8 border-b"
            >
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <p className="text-gray-600">{category.description}</p>
              <div className="products-grid grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category?.products?.map((product) => (
                  <ProductCard
                    key={product.id}
                    productTitle={product.title}
                    productDescription={product.description}
                    productPrice={product.price}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryBarComp;
