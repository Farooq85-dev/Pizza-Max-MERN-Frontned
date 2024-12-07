import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
