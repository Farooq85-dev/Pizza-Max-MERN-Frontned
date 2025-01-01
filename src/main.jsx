import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
import { UserProvider } from "./Context/User.context.jsx";
import { OrderProvider } from "./Context/User/Orders.context.jsx";
import { AdminOrderProvider } from "./Context/Admin/Orders.context.jsx";
import { ProductsProvider } from "./Context/Products.context.jsx";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <OrderProvider>
          <AdminOrderProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </AdminOrderProvider>
        </OrderProvider>
      </UserProvider>
    </Provider>     
  </StrictMode>
);
