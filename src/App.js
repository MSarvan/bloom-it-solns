import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import "./styles/App.scss";
import DetailsPage from "./components/DetailsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={ <DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
