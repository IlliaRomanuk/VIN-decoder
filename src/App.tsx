import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import VariableDetails from "./pages/VariableDetails/VariableDetails";
import Variables from "./pages/Variables/Variables";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/variables" element={<Variables />} />
        <Route path="/variables/:id" element={<VariableDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
