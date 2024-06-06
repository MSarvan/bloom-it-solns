import React from "react";
import "../styles/Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <nav>
      <h2>Movie App</h2>
      <button onClick={handleClick}>Home</button>
    </nav>
  );
};

export default Navbar;
