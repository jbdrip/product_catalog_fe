import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloClient";
import Layout from "../components/Layout/Layout";
import ProductsList from "../components/Product/ProductList";

const IndexPage: React.FC = () => {
  // Estado inicial del sidebar basado en el tamaño de pantalla
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>(["Todos"]); // Más categorías dinámicas
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  // Configurar estado inicial del sidebar según el dispositivo
  useEffect(() => {
    const checkInitialSidebarState = () => {
      // En desktop (>= 1025px), el sidebar está abierto por defecto
      // En mobile/tablet (< 1025px), está cerrado por defecto
      const isDesktop = window.innerWidth >= 1025;
      setSidebarOpen(isDesktop);
    };

    checkInitialSidebarState();
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkInitialSidebarState);
    
    return () => window.removeEventListener('resize', checkInitialSidebarState);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      >
        <div className="catalog-header">
          <div className="header-content">
            <h2>Catálogo de Productos</h2>
            <p className="header-subtitle">Descubre los mejores productos que tenemos para ti.</p>
          </div>
          <ProductsList searchTerm={searchTerm} selectedCategory={selectedCategory} setCategories={setCategories} setSelectedCategory={setSelectedCategory} setSearchTerm={setSearchTerm} />
        </div>
      </Layout>
    </ApolloProvider>
  );
};

export default IndexPage;