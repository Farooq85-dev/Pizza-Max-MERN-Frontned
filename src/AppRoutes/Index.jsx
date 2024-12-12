import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const HomePage = lazy(() => import("../Pages/Home"));
const Checkout = lazy(() => import("../Pages/Checkout"));
const NotFound = lazy(() => import("../Pages/NotFound"));

const AppRouting = () => {
  return (
    <Suspense fallback={<Loader width={30} />}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouting;
