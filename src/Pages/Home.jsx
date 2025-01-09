// Libraries Imports
import { lazy } from "react";

// Local Imports
const Slider = lazy(() => import("../Components/Slider"));
import CategoryBar from "../Components/CategoryBar";
const Products = lazy(() => import("../Components/Products"));
import FloatBtn from "../Components/FloatBtn";

const HomePage = () => {
  return (
    <>
      <Slider />
      <CategoryBar />
      <Products />
      <FloatBtn />
    </>
  );
};

export default HomePage;
