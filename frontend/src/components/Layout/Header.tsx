import React from "react";
import { HeaderProps } from "../../types";
import { Menu, Search, ShoppingCart, Bell, User } from "lucide-react";
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
      <div className="header-container">
        <div className="header-left">
          <button 
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
          <h1 className="logo">
            <span className="logo-oky">OKY</span>
            <span className="logo-store">Store</span>
          </h1>
        </div>
        
        <div className="header-center">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">Buscar</button>
          </div>
        </div>
        
        <div className="header-right">
          <button className="action-btn notification-btn" aria-label="Notificaciones">
            <Bell />
            <span className="notification-dot"></span>
          </button>
          
          <button className="action-btn cart-btn" aria-label="Carrito de compras">
            <ShoppingCart />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </button>
          
          <button className="action-btn profile-btn" aria-label="Perfil de usuario">
            <User />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;