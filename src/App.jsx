import { BrowserRouter } from "react-router-dom";
import AppRouting from "./AppRoutes/Index";

function App() {
  return (
    <BrowserRouter>
      <AppRouting />
    </BrowserRouter>
  );
}

export default App;
