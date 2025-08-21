import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloClient";
import Layout from "../components/Layout/Layout";
import ProductsList from "../components/Product/ProductList";

const IndexPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["Todos"]; // O actualizar dinámicamente desde la API

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
          <h2>Catálogo de Productos</h2>
          <ProductsList searchTerm={searchTerm} selectedCategory={selectedCategory} />
        </div>
      </Layout>
    </ApolloProvider>
  );
};

export default IndexPage;
