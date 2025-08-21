import React from "react";
import { SidebarProps, SidebarItem } from "../../types";
import { Filter } from "lucide-react";
import "../../styles/Sidebar.css";

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const sidebarItems: SidebarItem[] = [
    { icon: () => <span>🏠</span>, label: "Inicio", active: true },
    { icon: () => <span>📦</span>, label: "Productos" },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <nav>
        {sidebarItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={item.active ? "active" : ""}
          >
            <item.icon /> {item.label}
          </a>
        ))}
      </nav>
      <div className="categories">
        <h3><Filter /> Categorías</h3>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
