// Libraries Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Local Imports
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { UserProvider } from "./Context/User";
import { ProductsProvider } from "./Context/Products";

// Css Imports
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </UserProvider>
    </Provider>
  </StrictMode>
);
