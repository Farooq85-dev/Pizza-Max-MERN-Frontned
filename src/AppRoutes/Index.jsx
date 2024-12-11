import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("../Pages/Home"));
import Checkout from "../Pages/Checkout";
import Loader from "../Components/Loader";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader width={30} />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouting;
