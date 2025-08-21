import React from "react";
import { HeaderProps } from "../../types";
import { Menu, Search, ShoppingCart } from "lucide-react";
import "../../styles/Header.css";

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  searchTerm,
  setSearchTerm,
  cartItemCount = 0,
}) => {
  return (
    <header className="header">
      <div className="header-left">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}><Menu /></button>
        <h1>TechStore</h1>
      </div>
      <div className="header-center">
        <div className="search-wrapper">
          <Search />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="header-right">
        <button className="cart-btn">
          <ShoppingCart />
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;
