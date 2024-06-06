import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import "./styles/App.scss";
import DetailsPage from "./components/DetailsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={ <DetailsPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
