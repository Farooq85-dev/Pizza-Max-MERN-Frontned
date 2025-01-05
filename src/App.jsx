// Libraries Imports
import { BrowserRouter } from "react-router-dom";

// Local Imports
import AppRouting from "./AppRoutes/Index";

function App() {
  return (
    <BrowserRouter>
      <AppRouting />
    </BrowserRouter>
  );
}

export default App;
