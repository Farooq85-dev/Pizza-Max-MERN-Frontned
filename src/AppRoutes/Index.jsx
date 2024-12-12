import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const Home = lazy(() => import("../Pages/Home"));
const Checkout = lazy(() => import("../Pages/Checkout"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const UserDashboard = lazy(() => import("../Pages/UserDashboard"));

const AppRouting = () => {
  return (
    <Suspense fallback={<Loader width={30} />}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouting;
