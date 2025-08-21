import React from "react";
import { LayoutProps } from "../../types";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../styles/Layout.css";

const Layout: React.FC<LayoutProps> = ({
  children,
  sidebarOpen,
  setSidebarOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="layout">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <main className="layout-content">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
