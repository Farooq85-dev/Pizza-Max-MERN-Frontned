// Libraries Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Local Imports
import { Provider } from "react-redux";
import { UserProvider } from "./Context/User.context.jsx";
import { ProductsProvider } from "./Context/Products.context.jsx";
import App from "./App.jsx";
import store from "./Redux/Store.jsx";

// Css Imports
import "./Index.scss";

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
