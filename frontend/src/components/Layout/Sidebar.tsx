import React from "react";
import { SidebarProps, SidebarItem } from "../../types";
import { Filter, Home, Package, Heart, Settings, TrendingUp, X } from "lucide-react";
import "../../styles/Sidebar.css";

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const sidebarItems: SidebarItem[] = [
    { icon: () => <Home size={20} />, label: "Inicio", active: true },
    { icon: () => <Package size={20} />, label: "Productos" },
    { icon: () => <TrendingUp size={20} />, label: "Categorías" },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h3>Menú</h3>
        <button 
          className="close-sidebar" 
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar sidebar"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {sidebarItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`nav-item ${item.active ? "active" : ""}`}
            onClick={(e) => e.preventDefault()}
          >
            <span className="nav-icon">
              <item.icon />
            </span>
            <span className="nav-label">{item.label}</span>
            {item.active && <span className="active-indicator"></span>}
          </a>
        ))}
      </nav>
      
      <div className="categories-section">
        <div className="categories-header">
          <Filter size={18} />
          <h4>Categorías</h4>
        </div>
        
        <div className="categories-list">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              <span className="category-name">{cat}</span>
              {selectedCategory === cat && <span className="category-indicator"></span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;