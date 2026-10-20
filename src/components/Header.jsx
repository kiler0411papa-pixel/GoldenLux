import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">✨ GoldenLux</Link>
      </div>
      <nav className="nav-menu">
        <Link to="/">Головна</Link>
        <Link to="/catalog">Каталог товарів</Link>
        <Link to="/admin">Адмін-панель</Link>
      </nav>
    </header>
  );
};

export default Header;
