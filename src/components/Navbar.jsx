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
      <h2 onClick={handleClick}>Movie App</h2>
    </nav>
  );
};

export default Navbar;
