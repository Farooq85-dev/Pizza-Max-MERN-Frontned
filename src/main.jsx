// Libraries Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Local Imports
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
import { UserProvider } from "./Context/User.context.jsx";
import { OrderProvider } from "./Context/User/Orders.context.jsx";
import { AdminOrderProvider } from "./Context/Admin/Orders.context.jsx";
import { ProductsProvider } from "./Context/Products.context.jsx";
import { AdminUsersProvider } from "./Context/Admin/Users.context.jsx";
import { AdminProductsProvider } from "./Context/Admin/Products.context.jsx";

// Css Imports
import "./Index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <OrderProvider>
          <AdminOrderProvider>
            <AdminUsersProvider>
              <AdminProductsProvider>
                <ProductsProvider>
                  <App />
                </ProductsProvider>
              </AdminProductsProvider>
            </AdminUsersProvider>
          </AdminOrderProvider>
        </OrderProvider>
      </UserProvider>
    </Provider>
  </StrictMode>
);
