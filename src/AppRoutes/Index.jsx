// Libraries Imports
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Local Imports
import { useUser } from "../Context/User";
const Home = lazy(() => import("../Pages/Home"));
const Checkout = lazy(() => import("../Pages/Checkout"));
const UserDashboard = lazy(() => import("../Pages/UserDashboard"));
const AdminDashboardPage = lazy(() => import("../Pages/AdminDashboard.jsx"));
const NotFound = lazy(() => import("../Pages/NotFound"));
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";

const AppRouting = () => {
  const location = useLocation();
  const { isUser, user } = useUser();

  // Excluded Routes
  const noHeaderFooterRoutes = ["/user", "/admin"];
  const shouldShowNavbarFooter = !noHeaderFooterRoutes.includes(
    location.pathname
  );

  if (isUser === null) {
    return <Loader width={30} />;
  }

  return (
    <Suspense fallback={<Loader width={30} />}>
      {shouldShowNavbarFooter && <Navbar />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/user"
          element={
            isUser && user?.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isUser && user?.role === "admin" ? (
              <AdminDashboardPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowNavbarFooter && <Footer />}
    </Suspense>
  );
};

export default AppRouting;
