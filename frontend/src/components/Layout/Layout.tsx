import React, { useEffect } from "react";
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
  // Determinar si estamos en desktop
  const [isDesktop, setIsDesktop] = React.useState(false);
  
  React.useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1025);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Determinar la clase para el layout
  const getLayoutClass = () => {
    let baseClass = "layout";
    
    if (isDesktop) {
      // En desktop, por defecto el sidebar está "abierto" (visible)
      // Solo agregamos clase cuando está cerrado manualmente
      if (!sidebarOpen) {
        baseClass += " sidebar-closed";
      }
    } else {
      // En mobile, agregamos clase cuando está abierto
      if (sidebarOpen) {
        baseClass += " sidebar-open";
      }
    }
    
    return baseClass;
  };

  return (
    <div className={getLayoutClass()}>
      {/* Overlay para móvil cuando el sidebar está abierto */}
      {sidebarOpen && !isDesktop && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
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
        <div className="content-wrapper">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Layout;