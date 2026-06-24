// import { useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Variables from "./pages/Variables/Variables.tsx";
import VaribleDetails from "./pages/VariableDetails/VariableDetails.tsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/variables" element={<Variables />} />
      <Route path="/variables/:id" element={<VaribleDetails />} />
    </Routes>
  );
}

export default App;
