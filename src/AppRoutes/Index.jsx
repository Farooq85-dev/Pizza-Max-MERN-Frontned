import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("../Pages/Home"));
import Checkout from "../Pages/Checkout";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AppRouting = () => {
  return (
    <Suspense fallback={<Loader width={30} />}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouting;
