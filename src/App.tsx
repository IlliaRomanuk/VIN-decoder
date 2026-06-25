import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Variables from "./pages/Variables/Variables.tsx";
import VaribleDetails from "./pages/VariableDetails/VariableDetails.tsx";
import Layout from "./Layout.tsx";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/variables" element={<Variables />} />
        <Route path="/variables/:id" element={<VaribleDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
 